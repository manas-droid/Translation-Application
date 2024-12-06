import Word from './word-interface'




export const getWordTranslationInfo = async (word: string):Promise<Word[]>=>{
    const url = `http://localhost:3000/api/translation?word=${word}`;
    const response = await fetch(url);
    return response.json();
}