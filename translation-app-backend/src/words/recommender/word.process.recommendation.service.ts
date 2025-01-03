import Bull, { QueueOptions } from "bull";
import { RecommenderRequest } from "./word.recommender.interface.js";
import {
  getRecommendationsFromApi,
  saveRecommendationForUser,
  saveRecommendationForWord,
} from "./word.recommendation.service.js";

const bullOptions: QueueOptions = {
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
  },
};

const wordRecommenderQueue = new Bull<RecommenderRequest>(
  process.env.RECOMMENDER_QUEUE!,
  bullOptions
);

export default function defineRecommendationJob(){
    
    wordRecommenderQueue.process(async (payload) => {
        try {
          const recommendations = await getRecommendationsFromApi(payload.data);
          console.log(
            `Recommendation for the word ${payload.data.word}`,
            recommendations
          );
          if (payload.data.word && payload.data.lang){

            await saveRecommendationForWord(
              {
                lang:payload.data.lang,
                word:payload.data.word,
                recommendations:recommendations.related_words
              }
            );
          
            await saveRecommendationForUser(payload.data.userId, payload.data.word,recommendations.related_words)
          }
          return recommendations;

        } catch (error) {
          console.log("Error while submitting a job schedule");
        }
      });
      
}

