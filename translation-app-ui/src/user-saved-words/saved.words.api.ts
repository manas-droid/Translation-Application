import { TranslationResult } from "../linguee-translation/api/linguee.translation.interface";


const url = `${import.meta.env.VITE_SERVER_URL}/user/word`

export const saveWordForUser = async (translationResponse:TranslationResult,userId:string):Promise<any> =>{
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({translation:translationResponse, userId}),
        });

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export const getUserWords = async (userId:string):Promise<TranslationResult[]>=>{
    try{
        const response = await fetch(`${url}?userId=${userId}`);
        return await response.json();
    }catch(error:any){
        return [];
    }
}