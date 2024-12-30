import React, { useState } from "react";
import { TranslationResult } from "./api/linguee.translation.interface";
import { saveWordForUser } from "../user-saved-words/saved.words.api";
import LingueeText from "./LingueeText";
import LingueeExamples from "./LingueeExamples";
import {auth} from '../utils/firebase.js'
import { User } from "firebase/auth";

("./LingueeText");

interface LingueeTranslationProps {
  result: TranslationResult | undefined;
}

const LingueeTranslationPage: React.FC<LingueeTranslationProps> = ({
  result,
}) => {

  const [user,setUser] = useState<User|null>(null);
  auth.onAuthStateChanged((user)=>{
    setUser(user)
  });



  const handleRememberWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if(user)
      await saveWordForUser(result!, user.uid);
  };

  if (!result || Object.keys(result).length == 0) return <></>;

  return (
    <div className="mt-10 max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <LingueeText
        heading="Original"
        text={result.text}
        audio_link={result.src_audio_link}
      />
      <LingueeText
        heading="Translation"
        text={result?.translation?.text}
        audio_link={result?.translation?.audio_link}
      />

      {result.translation.pos && (
        <p className="text-gray-500 italic">
          Part of Speech: {result.translation.pos}
        </p>
      )}

      <LingueeExamples examples={result?.translation?.examples} />
      <button
        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRememberWord}
      >
        Remember Word
      </button>
    </div>
  );
};

export default LingueeTranslationPage;
