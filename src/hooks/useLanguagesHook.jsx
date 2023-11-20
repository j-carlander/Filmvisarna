import { useEffect, useState } from "react";

export default function useLanguagesHook() {
  const [languageNotFound, setLanguageNotFound] = useState(false);
  const [addedLanguage, setAddedLanguage] = useState(false);

  useEffect(() => {
    let timeoutId; // Variable to store timeout ID

    if (languageNotFound) {
      timeoutId = setTimeout(() => {
        setLanguageNotFound(false); // Remove the message after 1.5 seconds
      }, 1500);
    }

    if (addedLanguage) {
      timeoutId = setTimeout(() => {
        setAddedLanguage(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts or re-renders
    };
  }, [languageNotFound, addedLanguage]);

  return [
    languageNotFound,
    setLanguageNotFound,
    addedLanguage,
    setAddedLanguage,
  ];
}
