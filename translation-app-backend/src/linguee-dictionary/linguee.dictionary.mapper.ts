import { LingueeResponse, TranslationResult} from "./lingue.dictionary.interface.js";



export function mapToLingueeResponse(lingueeResponse:LingueeResponse[]):TranslationResult{
    const result: TranslationResult = {
        translation: {}
    };

    result.src_audio_link = removeProxyFromAudioLink(lingueeResponse?.[0].audio_links?.[0].url)
    result.text = lingueeResponse?.[0].text
    
    result.translation.audio_link = removeProxyFromAudioLink(lingueeResponse?.[0].translations?.[0].audio_links?.[0].url)
    result.translation.examples = lingueeResponse?.[0].translations?.[0].examples
    result.translation.pos= lingueeResponse?.[0].translations?.[0].pos
    result.translation.text= lingueeResponse?.[0].translations?.[0].text
    return result
}



// some audio_links may have a format like https://<whatever>/https://<something_else>. Therefore we need to transform
function removeProxyFromAudioLink(audioLink:string|undefined):string|undefined {
    if(audioLink?.lastIndexOf("https://") == 0) return audioLink;

    return audioLink?.substring(audioLink.lastIndexOf("https://"));
}