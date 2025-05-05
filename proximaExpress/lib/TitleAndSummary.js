const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

const token = process.env.GPT_ACCES_TOKE;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

async function TileandSummaryGenerator(generatedTranscription) {
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
          content: `Generate a short title and a brief description from the following transcription:\n\n"${generatedTranscription}"\n\nReturn a JSON object with the title and description like {"title": "<short_title>", "summary": "<short_description>"}`
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

  const content= response.body.choices[0].message.content;
  console.log(content);
  return JSON.parse(content)
}

module.exports = TileandSummaryGenerator;