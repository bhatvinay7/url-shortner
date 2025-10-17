import { Groq } from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.groq_api_key,
});

async function topicAssignerAgent(topics: any, data: any) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        You are an AI that classifies a webpage.
        Given the following data, identify the main topic (for which given input topic content of page fits perfect) and describe the application's context.

        topic: ${topics}
        Webpage Data: ${data}

        Return a JSON object with the following format:
        {
          "topic": "<add the any of these [acquisition,activation,retention] category based on the given data.do not add any other explantion for topic field> ",
          "applicationContext": "<one-line explanation of app context>"
        }`,
      },
    ],
    model: "openai/gpt-oss-20b",
    temperature: 0.7,
    top_p: 1,
    max_completion_tokens: 2048,
    reasoning_effort: "medium",
    response_format: { type: "json_object" },
    stream: false,
  });

  const raw = chatCompletion.choices?.[0]?.message?.content || "{}";
  const parsed = JSON.parse(raw);

  return parsed;
}

export default topicAssignerAgent;
