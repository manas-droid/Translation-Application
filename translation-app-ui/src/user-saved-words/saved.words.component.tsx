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
          <div className="flex">
            {
              result.recommendations && result.recommendations.length > 0 &&
              <p className="text-gray-500 italic mr-2">Recommendations:</p>
            }
            {
              result.recommendations && result.recommendations.length > 0 && result.recommendations.map((recomm:string, index:number)=>(
              <span key={index} className="font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-500 text-white">{recomm}</span>
              
              ))
            }

          </div>
        </div>
      ))}
    </>
  );
};

export default SavedWords;
