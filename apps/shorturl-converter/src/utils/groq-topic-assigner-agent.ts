import { Groq } from "groq-sdk";
import dotenv from 'dotenv'
dotenv.config()
const groq = new Groq({
  apiKey: process.env.groq_api_key,
});
async function topicAssignerAgent(topics: any, data: any) {
  const chatCompletionData = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `For the  webscapped input data of the webpage  add the topic name and user application of the app context- ${topics} and data ${data}. output format should has json with fields topic and applicationContext.applicationContext should informative and not include more than one line`,
      },
    ],
    model: "openai/gpt-oss-20b",
    temperature: 1,
    max_completion_tokens: 8192,
    top_p: 1,
    stream: true,
    reasoning_effort: "medium",
    response_format: {
      type: "json_object",
    },
    stop: null,
  });
  return chatCompletionData;
}
export default topicAssignerAgent;
