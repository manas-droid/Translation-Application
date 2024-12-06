import { Router } from 'express';
import { getLingueeTranslation } from './linguee.dictionary.controller.js';
const lingueeRouter = Router();
lingueeRouter.get('/translation', getLingueeTranslation);
export default lingueeRouter;
//# sourceMappingURL=linguee.dictionary.route.js.map