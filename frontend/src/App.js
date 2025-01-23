import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recognition, setRecognition] = useState(null);

  // Toggle listening state
  const toggleListeningState = () => {
    setIsListening(!isListening);
  };

  // Handle contact button click (Help button)
  const handleContactClick = () => {
    alert("Help is on the way!");
    // You can modify this to trigger a modal, a form, or open another page
  };

  // Function to handle voice input and add it as a new message
  const handleVoiceInput = (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text },
    ]);

    // Send user input to the backend and get the response
    fetch("http://127.0.0.1:8000/api/process-input/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          // Update messages with the model's response
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "assistant", text: data.response },
          ]);

          // Function to handle text-to-speech
          const speakResponse = (text) => {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = "en-US"; // Set language as per your preference
            window.speechSynthesis.speak(speech);
          };

          // Convert the response to speech
          speakResponse(data.response);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "error", text: "Something went wrong. Please try again later." },
        ]);
      });
  };

  useEffect(() => {
    // Initialize Speech Recognition (Web Speech API)
    const recognitionInstance =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionObj = new recognitionInstance();
    recognitionObj.lang = "en-US";
    recognitionObj.interimResults = false;
    recognitionObj.maxAlternatives = 1;

    // When speech is recognized, pass the result to handleVoiceInput
    recognitionObj.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice command:", transcript);
      handleVoiceInput(transcript); // Add the recognized text to the chat container
    };

    // Handle errors during voice recognition
    recognitionObj.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    // Handle end of speech recognition
    recognitionObj.onend = () => {
      if (recognitionObj) {
        setIsListening(false); // Reset listening state
      }
    };

    // Save the recognition instance for later use
    setRecognition(recognitionObj);

    // Clean up the recognition instance when component is unmounted
    return () => {
      if (recognitionObj) recognitionObj.stop();
    };
  }, []);

  useEffect(() => {
    // Start or stop the speech recognition when the listening state changes
    if (isListening && recognition) {
      recognition.start();
    } else if (!isListening && recognition) {
      recognition.stop(); // Guard against null
    }
  }, [isListening, recognition]);

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar expand="lg" fixed="top" className="navbar">
        <Container>
          <Navbar.Brand href="#" className="navbar-brand">
            Voicyx
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className={`hero ${isListening ? "expanded" : ""}`}>
        <Container>
          <h1>Welcome to Voicyx</h1>
          <p>Voice Assistant powered by Nvidia llama-3.1-405b-instruct</p>
          {!isListening ? (
            <button className="modern-button" onClick={toggleListeningState}>
              Let's Talk
            </button>
          ) : (
            <div
              className={`listening-circle ${isListening ? "active" : ""}`}
              aria-label="listening"
              onClick={toggleListeningState}
            >
              Listening...
            </div>
          )}
        </Container>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <Row>
          {messages.map((msg, index) => (
            <Col
              key={index}
              xs={12}
              className={msg.type === "user" ? "user-message" : "assistant-message"}
            >
              <div className="message-box">{msg.text}</div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Voicyx. All rights reserved</p>
      </footer>

      {/* Floating Action Button (FAB) */}
      <button
        className="fab-button"
        onClick={handleContactClick}
        aria-label="Help"
      >
        Help
      </button>
    </div>
  );
}

export default App;
