import Firecrawl from "@mendable/firecrawl-js";
import dotenv from "dotenv";
dotenv.config();
async function getWebPageInfo(url: string) {
  const firecrawl = new Firecrawl({ apiKey: process.env.api_key });
  const docs = await firecrawl.crawl(url, { limit: 8 });
  return docs;
}
export default getWebPageInfo;
