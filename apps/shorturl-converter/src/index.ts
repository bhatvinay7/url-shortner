import express from 'express'
const app=express()
const port=3011
import assignTopic from './utils/topicAssigner.js'
import topicAssignerAgent from './utils/groq-topic-assigner-agent.js'
import generatetHash from './utils/uniqueStringConverter.js'
import {Url,connectDB} from 'mongodb'

try{
  await connectDB()
  const data=await assignTopic("")

}
catch(error:any){
    console.log(error)
}

app.listen(port,'0.0.0.0',()=>{
    console.log(`server is running on port ${port}`)
})

