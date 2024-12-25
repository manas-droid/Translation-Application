import express from 'express'
import cors from 'cors'
import lingueeRouter from './linguee-dictionary/linguee.dictionary.route.js';
import userWordsRouter from './user-words/user.words.route.js';

const app = express()

app.use(express.json());
app.use(cors())

app.use('/api/v1/', lingueeRouter);
app.use('/api/v1/', userWordsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
