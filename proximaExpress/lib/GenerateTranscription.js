const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

const token = process.env.GPT_ACCES_TOKE;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

async function generateTranscription() {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: "You are a transcription generator for video content."
        },
        {
          role: "user",
          content: `Generate a transcription of approximately 60 words for a video where a user is discussing their application. 
          The application is a streamlined communication platform built with Electron, Next.js, Express.js, Socket.IO, and AI. 
          It is a desktop app designed for online collaboration and communication.`
        }
      ],
      temperature: 0.7,
      top_p: 1,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
   const content = response.body.choices[0].message.content;

  return  content
}

module.exports = generateTranscription;