export interface TranslationResult{
    text?:string,
    src_audio_link?:string,
    translation: Translation
}

export interface Translation{
    text?:string,
    pos?:string,
    examples?: Example[],
    audio_link?:string
}


export interface Example{
    src?:string,
    dst?:string
}

