import {TranslationResult} from './linguee.translation.interface'
const server_url:string = import.meta.env.VITE_SERVER_URL;
export const getWordTranslationInfo = async (word: string):Promise<TranslationResult>=>{
    if(word === undefined || word === '' || word.length === 0) return {} as TranslationResult;    
    const url = `${server_url}/translation?word=${word}`;
    const response = await fetch(url);
    return response.json();
}