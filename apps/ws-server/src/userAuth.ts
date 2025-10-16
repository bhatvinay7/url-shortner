import jwt from "jsonwebtoken"
import { userCredentials } from "types";
import dotenv from 'dotenv'
dotenv.config()
const secret=process.env.secret_key!
function verifyUser(token:string){
try {
  const decoded = jwt.verify(token, secret);
  return decoded as userCredentials
} catch(err:any) {
  console.log(err.message)
  throw new Error("user is not authenticated")
}

}

export default verifyUser