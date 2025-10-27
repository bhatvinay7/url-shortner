import redis from "redisclient";
export async function RateLimitter(userId:string){
     const count = await redis.get(userId!);
      if(count && parseInt(count)>5){ 
        const time=await redis.get("startTime")
        if(!time){
          await redis.set("startTime",Date.now()); // Set expiration time to 5 minutes
          await redis.expire("startTime",300); // Set expiration time to 5 minutes
          await redis.expire(userId!,300); // Set expiration time to 5 minutes
          const leftTime=Date.now()
          const waitTime= leftTime/1000
          return waitTime
        }
        else{
          // updat the user with left time for next request
           const leftTime=Date.now()-parseFloat(time!)
           const waitTime= leftTime/1000
           return waitTime
        }
      }
      else{
        await redis.incr(userId!);
        return null
      }
}