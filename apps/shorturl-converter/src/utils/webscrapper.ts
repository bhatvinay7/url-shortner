import { ApifyClient } from 'apify-client';
import dotenv from "dotenv";
dotenv.config();
async function getWebPageInfo(url: string){
  const client = new ApifyClient({
    token: process.env.api_key,
});

const input = {
    "startUrls": [
        {
            "url": `${url}`
        }
    ],
    "useSitemaps": false,
    "respectRobotsTxtFile": true,
    "crawlerType": "playwright:adaptive",
    "includeUrlGlobs": [],
    "excludeUrlGlobs": [],
    "keepUrlFragments": false,
    "ignoreCanonicalUrl": false,
    "ignoreHttpsErrors": false,
    "maxCrawlDepth": 20,
    "maxCrawlPages": 2,
    "initialConcurrency": 0,
    "maxConcurrency": 200,
    "initialCookies": [],
    "proxyConfiguration": {
        "useApifyProxy": true
    },
    "maxSessionRotations": 10,
    "maxRequestRetries": 3,
    "requestTimeoutSecs": 60,
    "minFileDownloadSpeedKBps": 128,
    "dynamicContentWaitSecs": 10,
    "waitForSelector": "",
    "softWaitForSelector": "",
    "maxScrollHeightPixels": 5000,
    "keepElementsCssSelector": "",
    "removeElementsCssSelector": `nav, footer, script, style, noscript, svg, img[src^='data:'],
        [role="alert"],
        [role="banner"],
        [role="dialog"],
        [role="alertdialog"],
        [role="region"][aria-label*="skip" i],
        [aria-modal="true"]`,
    "removeCookieWarnings": true,
    "blockMedia": true,
    "expandIframes": true,
    "clickElementsCssSelector": "[aria-expanded=\"false\"]",
    "htmlTransformer": "readableText",
    "readableTextCharThreshold": 20,
    "aggressivePrune": false,
    "debugMode": false,
    "debugLog": false,
    "saveHtml": false,
    "saveHtmlAsFile": false,
    "saveMarkdown": true,
    "saveFiles": false,
    "saveScreenshots": false,
    "maxResults": 9999999,
    "clientSideMinChangePercentage": 15,
    "renderingTypeDetectionPercentage": 10
};
const arr=[] as any  
    const run = await client.actor("aYG0l9s7dbB7j3gbS").call(input)
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item:AnalyserNode |any) => {
       arr.push(item)
    });
return arr
}
export default getWebPageInfo;




