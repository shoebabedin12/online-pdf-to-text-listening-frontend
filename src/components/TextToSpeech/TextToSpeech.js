import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const handleListen = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening({
        continuous: true,
        language: selectedLanguage,
      });
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <button onClick={handleListen}>Start Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en-US">English (United States)</option>
        <option value="bn-BD">Bengali (Bangladesh)</option>
      </select>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
