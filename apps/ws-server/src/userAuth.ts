import jwt from "jsonwebtoken"
import { userCredentials } from "types";
import dotenv from 'dotenv'
dotenv.config()
const secret=process.env.REFRESH_TOKEN!
function verifyUser(token:string){
try {
  const decoded = jwt.verify(token, secret);
  return decoded as userCredentials
} catch(err:any) {
  throw new Error("user is not authenticated")
}

}

export default verifyUser