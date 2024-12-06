import { mapToLingueeResponse } from './linguee.dictionary.mapper.js';
export async function getLingueeTranslation(req, res) {
    const { word } = req.query;
    const response = await fetch(`https://linguee-api.fly.dev/api/v2/translations?query=${word}&src=de&dst=en`);
    const lingueeWord = await response.json();
    if (lingueeWord == null || lingueeWord.length == 0) {
        res.status(404).json({ message: 'Word Not Found', statusCode: 404 });
        return;
    }
    const result = mapToLingueeResponse(lingueeWord);
    res.status(200).json(result);
}
//# sourceMappingURL=linguee.dictionary.controller.js.map