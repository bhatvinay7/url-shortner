import crypto from "crypto";
function generatetHash(url:string) {
  const hash = crypto.createHash("sha256");
  hash.update(url.trim(), "utf8");
  const hashedData = hash.digest("hex");
//   console.log("SHA-256 hash:", hashedData.slice(-5));
//   console.log(Buffer.from(hashedData.slice(-5)).toString("base64"));
return hashedData
}
export default generatetHash;
