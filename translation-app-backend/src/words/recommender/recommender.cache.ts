import { createClient} from "redis";
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export const addRecommendationToCache = async (word:string, recommendations:string[])=>{
    const response = await client.sAdd(word, recommendations);
    console.log("Response after adding Recommendation to cache",response);
}


export const getRecommendationFromCache =  async (word:string):Promise<string[]>=>{
    const response = await client.sMembers(word);
    console.log("Response after getting recommendation from cache", response);
    return response;
}