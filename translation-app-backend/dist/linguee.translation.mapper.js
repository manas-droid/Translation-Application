export function mapToLingueeResponse(lingueeWord) {
    const result = {
        translation: {}
    };
    result.src_audio_link = changeAudioLink(lingueeWord?.[0].audio_links?.[0].url);
    result.text = lingueeWord?.[0].text;
    result.translation.audio_link = changeAudioLink(lingueeWord?.[0].translations?.[0].audio_links?.[0].url);
    result.translation.examples = lingueeWord?.[0].translations?.[0].examples;
    result.translation.pos = lingueeWord?.[0].translations?.[0].pos;
    result.translation.text = lingueeWord?.[0].translations?.[0].text;
    return result;
}
function changeAudioLink(audioLink) {
    if (audioLink?.lastIndexOf("https://") == 0)
        return audioLink;
    return audioLink?.substring(audioLink.lastIndexOf("https://"));
}
//# sourceMappingURL=linguee.translation.mapper.js.map