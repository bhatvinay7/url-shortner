import crypto from "crypto";
function generatetHash(url:string) {
  const hash = crypto.createHash("sha256");
  hash.update(url.trim(), "utf8");
  const hashedData = hash.digest("hex");
//   console.log("SHA-256 hash:", hashedData.slice(-5)
return  Buffer.from(hashedData.slice(-5)).toString("base64")
}
export default generatetHash;
