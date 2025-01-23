// src/components/ListeningCircle.js
import React, { useState, useEffect } from "react";

const ListeningCircle = ({ onVoiceInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize Speech Recognition (Web Speech API)
    const recognitionInstance =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionObj = new recognitionInstance();
    recognitionObj.lang = "en-US";
    recognitionObj.interimResults = false;
    recognitionObj.maxAlternatives = 1;

    // When speech is recognized, pass the result to parent component
    recognitionObj.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice command:", transcript);

      // Pass recognized text to the parent component (ChatContainer)
      onVoiceInput(transcript);

      // Optionally, you can process the command (e.g., code snippets, etc.)
      // const codeSnippet = parseCommand(transcript);
      // if (codeSnippet) insertCodeIntoEditor(codeSnippet);
    };

    // Handle errors during voice recognition
    recognitionObj.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    // Handle end of speech recognition
    recognitionObj.onend = () => {
      setIsRecording(false); // Stop recording
    };

    // Save the recognition instance for later use
    setRecognition(recognitionObj);

    // Clean up the recognition instance when component is unmounted
    return () => {
      if (recognitionObj) recognitionObj.stop();
    };
  }, [onVoiceInput]);

  // Toggle voice recognition (start/stop)
  const toggleVoiceRecognition = () => {
    if (isRecording) {
      recognition.stop(); // Stop recognition
    } else {
      recognition.start(); // Start recognition
    }
    setIsRecording(!isRecording); // Toggle the recording state
  };

  return (
    <div className="listening-circle">
      <button
        className={`circle ${isRecording ? "listening" : ""}`}
        onClick={toggleVoiceRecognition}
      >
        {isRecording ? "Listening..." : "Click to Speak"}
      </button>
    </div>
  );
};

export default ListeningCircle;
