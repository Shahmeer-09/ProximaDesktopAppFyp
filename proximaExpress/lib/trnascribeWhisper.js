const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

function transcribeWithWhisper(filePath) {
  return new Promise((resolve, reject) => {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }
    
    const pythonPath = "C:/Users/PMLS/AppData/Local/Programs/Python/Python312/python.exe";
    const pythonScript = "E:/proximadesk-desktop-app/proximaExpress/lib/transcribe.py";
    
    console.log(`Transcribing file: ${filePath}`);
    const command = `"${pythonPath}" "${pythonScript}" "${filePath}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Transcription error:", error);
        return reject(error);
      }
      
      if (stderr && stderr.trim() !== "") {
        console.warn("Python stderr:", stderr);
      }
      
      console.log("Transcription complete");
      console.log("Transcription output length:", stdout.trim().length);
      console.log("Transcription output preview:", stdout.trim().substring(0, 100));
      
      // If output is empty, return a default message
      if (!stdout.trim()) {
        console.log("No transcription text returned from Python script");
        resolve("No speech detected in the recording.");
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

module.exports = { transcribeWithWhisper };