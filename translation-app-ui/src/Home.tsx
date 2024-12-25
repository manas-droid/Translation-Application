import { useState } from "react";
import { TranslationResult } from "./linguee-translation/api/linguee.translation.interface";
import LingueeTranslationPage from "./linguee-translation/LingueeTranslationPage";
import SearchBar from "./linguee-translation/SearchBar";

const Home: React.FC = () => {
  const [translationResult, setTranslationResult] =
    useState<TranslationResult>();

  const handleTranslationResult = (lingueeResult: TranslationResult): void => {
    setTranslationResult(lingueeResult);
  };

  return (
    <header className="App-header">
      <h1 className="text-3xl font-bold text-center mt-5">
        Translation Application
      </h1>
      <SearchBar onTranslationResult={handleTranslationResult} />
      <LingueeTranslationPage result={translationResult} />
    </header>
  );
};


export default Home;