import redis from "redisclient";
export async function RateLimitter(userId:string){
     const count = await redis.get(userId!);
     const startTime=await redis.get(`startTime-${userId!}`)// it is used calulate the user click span of 5 minits
     if(startTime){
      if(count && parseInt(count)>=5){ 
        const time=await redis.get(`limit-${userId}`) // It acts like a timer
        if(!time){
          await redis.set(`limit-${userId}`,Date.now()); // Set expiration time to 5 minutes
          await redis.expire(`limit-${userId}`,300); // Set expiration time to 5 minutes
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
     }
      else{
        await redis.incr(userId!);
        const time=await redis.get(`startTime-${userId!}`)
        if(!time){
        await redis.set(`startTime-${userId!}`,Date.now());
        await redis.expire(`startTime-${userId!}`,300);
        await redis.expire(userId!,300);
        }
        return null
      }
}