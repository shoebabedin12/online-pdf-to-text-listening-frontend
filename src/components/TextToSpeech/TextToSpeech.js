import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const availableVoices = await window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        setSelectedVoice(findBengaliVoice(availableVoices));
      } catch (error) {
        console.error("Error fetching voices:", error);
      }
    };

    const findBengaliVoice = (availableVoices) => {
      return availableVoices.find((voice) => voice.lang.includes("bn"));
    };
console.log(window.speechSynthesis.getVoices());

    const speechSynthesisSupported = "speechSynthesis" in window;
    if (speechSynthesisSupported) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
      fetchVoices();
    } else {
      console.error("Speech synthesis not supported.");
    }
  }, [text]);

  const speak = () => {
    if (selectedVoice) {
      let utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Bengali voice not found.");
    }
  };

  return (
    <div>
      {selectedVoice && (
        <div>
          <p>
            Selected Voice: {selectedVoice.name} ({selectedVoice.lang})
          </p>
          <button onClick={speak}>Speak</button>
        </div>
      )}
      {!selectedVoice && (
        <p>
          Bengali voice not found. Please make sure Bengali voice is available
          on your system.
        </p>
      )}
    </div>
  );
};

export default TextToSpeech;
