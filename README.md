# Voicyx

Voicyx is an advanced voice assistant web application that uses a large language model (NVIDIA's LLaMA-3.1-405b-Instruct) to convert voice input into meaningful text responses and audio output. It contains a browser frontend and a backend API that handles audio capture/processing, model inference orchestration, and audio synthesis.

---

## Features

- Voice capture in the browser (microphone input).
- Client-side recording + upload to backend for processing.
- Backend orchestration of an LLM (LLaMA-style) for voice-to-text instruction processing.
- Text response generation and audio (TTS) output returned to the client.
- Minimal, responsive web UI for interacting with the assistant.
- Extensible design to swap models (local / remote) and TTS engines.
---
## Requirements

### Local dev (recommended)
- Python 3.10+ (for backend)  
- Node.js 16+ / npm (only if frontend build tools or dev server are used)  
- A model inference endpoint or local model runtime (NVIDIA LLaMA-based runtime, OpenAI, or similar)  
---
## Quickstart (local)

### 1. Clone the repo
 - git clone https://github.com/gokul722711/Voicyx.git
- cd Voicyx

### 2. Backend
- cd backend
- python -m venv .venv
- source .venv/bin/activate    # on Windows: .venv\Scripts\activate
- pip install -r requirements.txt
- Create a `.env` file in `backend/` with required environment variables (see below).


### 3. Frontend
- If `frontend/index.html` is static, open it in your browser or serve it via a simple server:
- cd frontend
- python -m http.server 3000 then open http://localhost:3000
- If a Node-based dev server is required:
- cd frontend
- npm install
- npm run dev

4. Open the UI and test voice interactions.

---
## Backend details

### Typical endpoints
- `POST /api/voice` — upload recorded audio. Backend converts audio to required format and forwards to ASR or to an LLM orchestration pipeline.
- `POST /api/chat` — send text queries (or transcribed text) directly.
- `GET /api/status` — check service health.
---
### Inference flow
1. Browser records audio and sends it to backend `/api/voice`.
2. Backend may run speech-to-text (local ASR or cloud API) to transcribe the audio.
3. Transcribed text is sent to the model wrapper (LLaMA-3.1-405b-Instruct via the configured runtime).
4. The model returns text response(s), optionally with instruction metadata.
5. Backend runs TTS (Text-to-speech) to synthesize audio for the response (or uses prebuilt TTS cloud service).
6. Backend returns JSON including text and a URL or base64 audio for playback in the frontend.

### Model integration
- The model used is `LLaMA-3.1-405b-Instruct` (NVIDIA). The backend contains a small wrapper to call model API or local inference service.
- Ensure rate limiting, batching, and timeouts are in place for large models.

---

## Usage

1. Start backend.
2. Serve/open the frontend.
3. Grant microphone access in the browser.
4. Press the record button, speak, stop recording, and wait for the assistant’s reply (text + audio).

---

## Development notes & troubleshooting

- If audio upload fails: check CORS and make sure frontend sends requests to correct backend host/port.
- If the model doesn't respond: verify API keys, endpoints, and that the model runtime has enough GPU/memory.
---
#### by Gokula Krishnan G V - Exploring LLMs 
