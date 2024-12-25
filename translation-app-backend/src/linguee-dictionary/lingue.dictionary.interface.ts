
import { Example } from "../utils/translation.response.js"

export interface LingueeResponse{
    featured? : boolean,
    text?: string,
    pos?: string,
    translations?: {
        text:string,
        pos:string,
        examples: Example[],
        audio_links:Audio[]
    }[]
    audio_links?: Audio[]
}


interface Audio{
    url:string,
    lang:string
}
