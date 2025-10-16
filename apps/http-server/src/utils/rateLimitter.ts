import redis from "redisclient";
export async function RateLimitter(userId:string){
     const count = await redis.get(userId!);
      if(count && parseInt(count)>5){
        const time=await redis.get("startTime")
        if(!time){
          redis.set("startTime",Date.now()); // Set expiration time to 5 minutes
          redis.expire("startTime",300); // Set expiration time to 5 minutes
          redis.expire(userId!,300); // Set expiration time to 5 minutes
        }
        const startTime= await redis.get("startTime")  // updat the user with left time for next request
        const leftTime= startTime ? Date.now()-parseInt(startTime):0
        const waitTime= leftTime/1000
        return waitTime
      }
      else{
        await redis.incr(userId!);
        return null
      }
}