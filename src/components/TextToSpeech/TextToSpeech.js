import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "bn-BD", // Set the language to Bengali (Bangladesh)
      });
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div>
      <button onClick={handleListen}>Start Listening</button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
