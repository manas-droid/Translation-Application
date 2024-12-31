import express from 'express'
import cors from 'cors'
import lingueeRouter from './linguee-dictionary/linguee.dictionary.route.js';
import userWordsRouter from './words/words.route.js';
import usersRouter from './users/users.route.js';
import defineRecommendationJob from './words/recommender/word.process.recommendation.service.js';
const app = express()

app.use(express.json());
app.use(cors())

app.use(process.env.API_ENDPOINT_START!, lingueeRouter);
app.use(process.env.API_ENDPOINT_START!, userWordsRouter);
app.use(process.env.API_ENDPOINT_START!, usersRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  defineRecommendationJob()
  console.log(`Server is running on http://localhost:${PORT}`);
});
