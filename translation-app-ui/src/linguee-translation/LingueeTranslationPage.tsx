import React from "react"
import { TranslationResult } from "./api/linguee.translation.interface"
import {saveWordForUser} from '../user-saved-words/saved.words.api';

interface LingueeTranslationProps {
    result:TranslationResult | undefined
}
  
const LingueeTranslationPage: React.FC<LingueeTranslationProps> = ({result})=>{


  const handleRememberWord = async (e:React.FormEvent)=>{
    e.preventDefault();
    const response = await saveWordForUser(result!);
    console.log(response);
  }

  if(!result || Object.keys(result).length == 0) 
        return <></>

    return (
        <div className="mt-10 max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {result.text && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Original Text:</h3>
              <p className="text-gray-700">{result.text}</p>
            </div>
          )}

            {result.src_audio_link && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Listen to Original Audio:</h3>
                <audio controls className="w-full">
                  <source src={result.src_audio_link} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

    
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Translation:</h3>
            <p className="text-gray-700">{result.translation.text}</p>
            {result.translation.pos && (
              <p className="text-gray-500 italic">Part of Speech: {result.translation.pos}</p>
            )}
          </div>
    
          {result.translation.examples && result.translation.examples.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Examples:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {result.translation.examples.map((example, index) => (
                  <li key={index} className="text-gray-700">
                    {example.src && <p><strong>Original:</strong> {example.src}</p>}
                    {example.dst && <p><strong>Translation:</strong> {example.dst}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
    
          <div>
            {result.translation.audio_link && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Listen to Translation Audio:</h3>
                <audio controls className="w-full">
                  <source src={result.translation.audio_link} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
          <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRememberWord}>Remember Word</button>
        </div>

      
      );
    }

export default LingueeTranslationPage