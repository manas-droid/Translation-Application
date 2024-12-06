

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



export interface TranslationResult{
    text?:string,
    src_audio_link?:string,
    translation: Translation
}


export interface ErrorResponse{
    message:string,
    statusCode: number
}


export interface Translation{
    text?:string,
    pos?:string,
    examples?: Example[],
    audio_link?:string
}

interface Example{
    src?:string,
    dst?:string
}



interface Audio{
    url:string,
    lang:string
}
