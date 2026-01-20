import ratelimit from "../src/config/upstash.js";

const rateLimiter=async (req,res,next)=>{
    try {
        const {success}= await ratelimit.limit("my-limit-key");
        if(!success) {
            return res.status(429).json({
                message : "Too many attempts, please try again later"
            })
        }

        next();
    } catch (error) {
        console.log("Rate limit error");
        return res.status(400).json({
            message:"Internal Server Error"
        })
    }
};

export default rateLimiter;