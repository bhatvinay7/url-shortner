import getWebPageInfo from "./webscrapper.js";
import topicAssignerAgent from "./groq-topic-assigner-agent.js";
enum Topics {
  ACQUISITION = "acquisition",
  ACTIVATION = "activation",
  RETENTION = "retention",
}
async function assignTopic(url: string) {
  const data = await getWebPageInfo(url);
  const response = await topicAssignerAgent(Topics, data);
  return response;
}
export default assignTopic;
