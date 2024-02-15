import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechToText = ({text}) => {
    console.log(text);
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

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const speakTranscript = () => {
    const utterance = new SpeechSynthesisUtterance(transcript) || new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button onClick={handleListen}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={speakTranscript}>Speak Transcript</button>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en-US">English (United States)</option>
        <option value="bn-BD">Bengali (Bangladesh)</option>
      </select>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
