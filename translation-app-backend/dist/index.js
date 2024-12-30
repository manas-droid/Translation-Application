import express from 'express';
import cors from 'cors';
import lingueeRouter from './linguee-dictionary/linguee.dictionary.route.js';
import userWordsRouter from './user-words/user.words.route.js';
import usersRouter from './users/users.route.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(process.env.API_ENDPOINT_START, lingueeRouter);
app.use(process.env.API_ENDPOINT_START, userWordsRouter);
app.use(process.env.API_ENDPOINT_START, usersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map