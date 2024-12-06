import express from 'express'
import cors from 'cors'
import lingueeRouter from './linguee-dictionary/linguee.dictionary.route.js';


const app = express()

app.use(express.json());
app.use(cors())

app.use('/api/v1/', lingueeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
