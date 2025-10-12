import getWebPageInfo from "./webscrapper.js";
import topicAssignerAgent from "./groq-topic-assigner-agent.js";
enum Topics {
  ACQUISITION = "acquisition",
  ACTIVATION = "activation",
  RETENTION = "retention",
}
async function assignTopic(url: string) {
  const data = await getWebPageInfo(url);
  const textContent = data.map((page:any) => page?.markdown || page?.readableText).join("\n\n");
  const response = await topicAssignerAgent(Topics, textContent);
  console.log(response)
  return response;
}
export default assignTopic;
