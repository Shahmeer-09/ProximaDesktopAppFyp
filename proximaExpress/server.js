require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
const Readable = require("stream").Readable;
const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const generateTranscription = require("./lib/GenerateTranscription");
const TileandSummaryGenerator = require("./lib/TitleAndSummary");
// const {transcribeWithWhisper} = require("./lib/trnascribeWhisper"); // Fixed typo in filename

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: process.env.ELECTRON_HOST_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

let recordChunks = [];

io.engine.on("connection_error", (err) => {
  console.log("Connection Error:", err);
});

io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);

  socket.on("video-chunks", async (data) => {
    console.log("Received video chunks from:", socket.id, data.fileName);
    const writeStream = fs.createWriteStream(`./uploads/${data.fileName}`);
    recordChunks.push(data.chunks);
    const videoBlob = new Blob(recordChunks, {
      type: "video/webm; codecs=vp9",
    });
    const buffer = Buffer.from(await videoBlob.arrayBuffer());
    const readable = Readable.from(buffer);
    readable.pipe(writeStream).on("finish", () => {
      console.log("Video saved successfully");
    });
  });

  socket.on("process-video", async (data) => {
    console.log("Processing video request from:", socket.id);
    
    // Don't reset recordChunks until after processing
    const fileName = data.fileName; // Use consistent naming
    const uploadsDir = path.join(__dirname, "uploads");
    const filePath = path.join(uploadsDir, fileName);
  
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      socket.emit("error", { message: "Video file not found" });
      return;
    }

    try {
      // Read the file
      const file = fs.readFileSync(filePath);

      const processing = await axios.post(
        `${process.env.NEXT_HOST_URL}/recording/${data.userId}/processing`, {
          fileName: fileName // Consistent naming
        }
      );

      if (processing.status !== 200) {
        console.log("Error processing video");
        socket.emit("error", { message: "Error processing video on server" });
        return;
      }

      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: "video/webm",
      });

      const fileStatus = await s3.send(uploadCommand);
      if (fileStatus.$metadata.httpStatusCode === 200) {
        console.log("Video uploaded to AWS");

        if (processing.data.plan === "PRO") {
          const stats = fs.statSync(filePath);
          
          if (stats.size < 25000000) { // Less than 25MB
            try {
             
              const generatedTranscription =await generateTranscription();
              console.log("Generated Transcription:", generatedTranscription);
              // Generate title and summary using Ollama
              try {
                const titleAndDescriptionResponse =await TileandSummaryGenerator(generatedTranscription)
                const generatedTitleAndDescription = titleAndDescriptionResponse
                console.log("Generated Title and Description:", generatedTitleAndDescription);
                // Try to parse as JSON, with fallback
                let parsedContent = generatedTitleAndDescription;
                
                const summaryTranscriptionSave = await axios.post(
                  `${process.env.NEXT_HOST_URL}/recording/${data.userId}/transcribe`,
                  {
                    fileName: fileName,
                    content: parsedContent,
                    transcription:generatedTranscription ,
                  }
                );

                if (summaryTranscriptionSave.status !== 200) {
                  console.log("Something went wrong when creating title and summary");
                }
              } catch (error) {
                console.error("somethin went wrong with ai work", error);
              }
            } catch (transcriptionError) {
              console.error(
                "Error during transcription or summarization:",
                transcriptionError
              );
            }
          }
        }

        const complete = await axios.post(
          `${process.env.NEXT_HOST_URL}/recording/${data.userId}/complete`,
          {
            fileName: fileName,
          }
        );
        
        if (complete.status !== 200) {
          console.log(
            "💥 Something went wrong when stopping the process and trying to complete the process"
          );
        } else {
          // Only delete the file if complete was successful
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
              return;
            }
            console.log("Video file deleted successfully");
          });
          
          // Reset chunks only after successful processing
          recordChunks = [];
        }
      } else {
        console.log("💥 Something went wrong with S3 upload");
        socket.emit("error", { message: "Failed to upload to S3" });
      }
    } catch (error) {
      console.error("Error in process-video:", error);
      socket.emit("error", { message: "Server error processing video" });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, "Reason:", reason);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});