import { auth } from "../utils/firebase.js";
import { TranslationResult } from "../linguee-translation/api/linguee.translation.interface.js";
import LingueeText from "../linguee-translation/LingueeText.js";
import LingueeExamples from "../linguee-translation/LingueeExamples.js";
import { useEffect, useState } from "react";
import { getUserWords } from "./saved.words.api.js";
const SavedWords: React.FC = () => {
  const [savedWords, setSavedWords] = useState<TranslationResult[] | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

        if(!savedWords){
          console.log(savedWords)
          const response = await getUserWords(user.uid);
          console.log("User saved words",response)
          setSavedWords(response)

          // setSavedWords([
          //     {
          //         translation:{
          //             text:'to celebrate',
          //             pos:'verb'
          //         },
          //         text:'feiern'
          //     }
          // ])
        }
        
    });
    return () => unsubscribe();
  }, [savedWords]);

  if (!savedWords || savedWords.length == 0) {
    return (
      <>
        <h1 className="text-3xl font-bold text-center mt-5">
          You have not saved any words
        </h1>
      </>
    );
  }

  return (
    <>
      <header className="App-header">
        <h1 className="text-3xl font-bold text-center mt-5">
          User Saved Words
        </h1>
      </header>
      {savedWords.map((result, index) => (
        <div
          className="mt-10 max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6"
          key={index}
        >
          <LingueeText
            heading="Original"
            text={result?.text}
            audio_link={result?.src_audio_link}
          />
          <LingueeText
            heading="Translation"
            text={result?.translation?.text}
            audio_link={result?.translation?.audio_link}
          />

          {result?.translation.pos && (
            <p className="text-gray-500 italic">
              Part of Speech: {result.translation.pos}
            </p>
          )}

          <LingueeExamples examples={result?.translation?.examples} />
        </div>
      ))}
    </>
  );
};

export default SavedWords;
