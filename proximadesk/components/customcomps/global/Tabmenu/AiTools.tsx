import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import Loader from "../Loader";
import { File, Pen, Settings, Stars, Send, AlertCircle } from "lucide-react";
import Modal from "../Modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { AzureKeyCredential } from "@azure/core-auth";
import Paymentbutton from "../Payment-button";

type Props = {
  trial: boolean | undefined;
  plan: "FREE" | "PRO";
  videoId: string | undefined;
  transcription: string;
};

// AI Question Answering Service
const answerQuestion = async (transcription: string, question: string) => {
  try {
    // Use dynamic import to avoid server-side issues
    const { default: ModelClient } = await import("@azure-rest/ai-inference");
    const { isUnexpected } = await import("@azure-rest/ai-inference");

    const token = process.env.NEXT_PUBLIC_GPT_ACCESS_TOKEN;
    const endpoint = "https://models.github.ai/inference";
    const model = "openai/gpt-4.1";

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token as string)
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that answers questions based on video transcription. Only answer questions related to the transcription content. If a question is not related to the transcription, politely decline to answer and suggest contacting support.",
          },
          {
            role: "user",
            content: `Video Transcription: "${transcription}"
            
            User Question: "${question}"
            
            Answer the question based only on the transcription. If the question is not related to the transcription content, politely decline to answer and suggest emailing shahmeerweb@gmail.com for support.`,
          },
        ],
        temperature: 0.7,
        top_p: 1,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error("Error in AI service:", error);
    return "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
  }
};

const AiTools = (props: Props) => {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([
    {
      role: "bot",
      content:
        "Hi there! I'm your AI assistant. Ask me any questions about the video content.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // For trial users, check question limit
    if (props.trial && questionCount >= 4) {
      setLimitReached(true);
      return;
    }

    // Add user message
    const userMessage = inputValue;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get AI response based on transcription context
      const transcription =
        props.transcription || "No transcription available for this video.";
      const response = await answerQuestion(transcription, userMessage);

      // Add response to messages
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: response || "Sorry, no response was received from the AI.",
        },
      ]);

      // Count the question for trial users
      if (props.trial) {
        setQuestionCount((count) => count + 1);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Sorry, I encountered an error processing your question. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // AI Chat Modal Content
  const AIChatContent = (
    <>
      {/* Transcription context */}
      <div className="mb-4">
        <Alert className="bg-zinc-800 border-purple-800">
          <AlertCircle className="h-4 w-4 text-purple-400" />
          <AlertTitle className="text-purple-400">Video Context</AlertTitle>
          <AlertDescription className="text-zinc-300 text-sm  truncate w-full  ">
            <Modal
              title="Detailed transcription"
              description=""
              trigger={
                <span className="cursor-pointer hover:underline">
                  {" "}
                  {props.transcription?.substring(0, 100) ||
                    "No transcription available for this video."}
                </span>
              }
            >
              <span>
                {" "}
                {props.transcription ||
                  "No transcription available for this video."}
              </span>
            </Modal>
          </AlertDescription>
        </Alert>
      </div>

      {/* Trial user warning */}
      {props.trial && (
        <div className="mb-4">
          <Alert className="bg-zinc-800 border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <AlertTitle className="text-amber-400">Trial Account</AlertTitle>
            <AlertDescription className="text-zinc-300 text-sm">
              You can ask up to 5 questions with your trial account. Questions
              remaining: {5 - questionCount}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Chat messages */}
      <ScrollArea className="h-64 pr-4 mb-4">
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.role === "user"
                    ? "bg-purple-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                    : "bg-zinc-800 text-zinc-100 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                } py-2 px-3 max-w-[80%]`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {limitReached && (
            <div className="flex justify-center my-2">
              <Alert className="bg-red-900/30 border-red-800 w-full">
                <AlertTitle className="text-red-400">
                  Question Limit Reached
                </AlertTitle>
                <AlertDescription className="text-zinc-300 text-sm">
                  Youve reached your 5 question limit. Upgrade to PRO for
                  unlimited questions.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center my-2">
              <div className="flex items-center gap-2 text-purple-400">
                <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
                <p className="text-sm">AI is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            placeholder="Ask a question about the video..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-zinc-800 border-zinc-700 text-zinc-100"
            disabled={limitReached || isLoading}
          />
        </div>
        <Button
          onClick={handleSendMessage}
          className="bg-purple-600 hover:bg-purple-700"
          disabled={limitReached || !inputValue.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-1" /> Send
            </>
          )}
        </Button>
      </div>
    </>
  );

  return (
    <TabsContent
      value="Ai tools"
      className="flex flex-col gap-y-5 p-5 rounded-xl bg-zinc-800"
    >
      <div className="flex items-center">
        <div className="w-8/12 flex flex-col">
          <h2 className="text-zinc-100 text-2xl font-semibold capitalize">
            AI tools
          </h2>
          <p className="text-sm text-zinc-400">
            Take your videos to next step <br /> with the power of ai
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          { props.plan === "PRO" ? (
            <Modal
              trigger={
                <Button className="bg-white text-zinc-800">
                  <Loader state={false}>AI Agent</Loader>
                </Button>
              }
              title="AI Video Assistant"
              description="Ask questions about the video content and get AI-powered answers."
            >
              {AIChatContent}
            </Modal>
          ) : (
            <div className="flex items-center justify-between gap-x-2">
              <Modal
                trigger={
                  <Button className="bg-white text-zinc-800">
                    <Loader state={false}>Trial Ai</Loader>
                  </Button>
                }
                title="AI Video Assistant"
                description="Ask questions about the video content and get AI-powered answers."
              >
                {AIChatContent}
              </Modal>
              <Paymentbutton />
            </div>
          )}
          <Button className="bg-white text-zinc-800">
            <Loader state={false}>Try now</Loader>
          </Button>
        </div>
      </div>
      <div className="bg-[#1b0f1b7f] flex flex-col gap-y-3 p-4 rounded-lg">
        <div className="flex items-center justify-start gap-x-2">
          <h2 className="text-2xl text-purple-700 font-bold">Open Ai</h2>
          <Stars
            fill="oklch(0.496 0.265 301.924)"
            color="oklch(0.496 0.265 301.924)"
            size={24}
          />
        </div>
        <div>
          <div className="flex items-center gap-x-3">
            <div className="rounded-full h-10 w-10 bg-[#3427347f] p-2">
              <Pen color="oklch(0.496 0.265 301.924)" size={24} />
            </div>
            <div>
              <h2 className="text-purple-400 text-lg font-semibold">Summary</h2>
              <p className="text-purple-600 text-sm">
                Generate a summary of your video using Ai
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-3">
            <div className="rounded-full h-10 w-10 bg-[#3427347f] p-2">
              <File color="oklch(0.496 0.265 301.924)" size={24} />
            </div>
            <div>
              <h2 className="text-purple-400 text-lg font-semibold">
                Title Description
              </h2>
              <p className="text-purple-600 text-sm">
                Generate a title and description
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-3">
            <div className="rounded-full h-10 w-10 bg-[#3427347f] p-2">
              <Settings color="oklch(0.496 0.265 301.924)" size={24} />
            </div>
            <div>
              <h2 className="text-purple-400 text-lg font-semibold">
                AI agent
              </h2>
              <p className="text-purple-600 text-sm">
                Viewers can ask questions on your video and ai agent will answer
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
