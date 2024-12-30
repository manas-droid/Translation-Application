interface TextInfo{
    heading:string
    text:string|undefined,
    audio_link:string|undefined
}


const LingueeText:React.FC<TextInfo> = ({heading,text, audio_link})=>{
const playAudio = (e: React.FormEvent, audio_url: string | undefined) => {
  e.preventDefault();
  const audio = new Audio(audio_url);
  audio.play();
};

    return (
        <div className="flex flex-row">
        {text && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {heading}
            </h3>
            <p className="text-gray-700">{text}</p>
          </div>
        )}

        {audio_link && (
          <div>
            <img
              className="w-4 mt-2 ml-2 cursor-pointer"
              src="../../../public/volume-up.png"
              onClick={(e) => playAudio(e, audio_link)}
            />
          </div>
        )}
      </div>
    )
}

export default LingueeText;