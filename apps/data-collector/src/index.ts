import express from 'express'
const app=express()
const port=3012
import {consumeFromQueue} from "./rabbitmq-consumer.js";
// created the rabbitmq package to handle the mesage
try{
  (async()=>{
  
    await consumeFromQueue("topic","user-metrics","data.*","data-collector")

  })()
}
catch(error:any){
  console.log(error.message)
}

app.listen(port,"0.0.0.0",()=>{
  console.log("Consumer collector running on port ${port}")
})


