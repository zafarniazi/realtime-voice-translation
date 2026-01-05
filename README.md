# Real-Time Voice Translation

A real-time voice translation application that uses browser speech recognition to capture speech and translates it to different languages using OpenAI's GPT models. Built with React, TypeScript, Express, and Socket.IO.

## Features

- 🎤 **Real-time Speech Recognition**: Uses browser's Web Speech API for continuous speech recognition
- 🌍 **Multi-language Translation**: Translate speech to various target languages
- ⚡ **Real-time Communication**: WebSocket-based communication for instant translation delivery
- 🎨 **Modern UI**: Built with Material-UI for a polished user experience
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **Vite** - Build tool and dev server
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web server
- **Socket.IO** - WebSocket server
- **OpenAI API** - Translation service

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- Modern browser with Web Speech API support (Chrome, Edge, Safari)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd realtime-voice-translation
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Configuration

### Server Configuration

Create a `.env` file in the `server` directory:

```env
PORT=4000
OPENAI_API_KEY=your_openai_api_key_here
```

### Client Configuration

The client uses environment variables for configuration. Create a `.env` file in the `client` directory (optional):

```env
VITE_SOCKET_URL=http://localhost:4000
```

If not provided, it defaults to `http://localhost:4000`.

## Running the Application

### Development Mode

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on port 4000 (or the port specified in `.env`).

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173` (or the next available port).

3. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Allow microphone permissions when prompted
   - Select a target language
   - Click "Start Recording" and begin speaking

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

## Project Structure

```
realtime-voice-translation/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── app/            # Main app component
│   │   ├── components/     # React components
│   │   │   ├── atoms/      # Basic components
│   │   │   ├── molecules/  # Composite components
│   │   │   ├── organisms/  # Complex components
│   │   │   └── layout/     # Layout components
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useSocket.ts    # Socket.IO hook
│   │   │   └── useSpeech.ts    # Speech recognition hook
│   │   ├── config/         # Configuration files
│   │   └── constant/       # Constants
│   └── package.json
├── server/                 # Backend application
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## Usage

1. **Start Recording**: Click the "Start Recording" button
2. **Speak**: The application will capture your speech in real-time
3. **View Translation**: Translated text appears below the original text
4. **Stop Recording**: Click "Stop Recording" when finished

### Supported Languages

The application supports translation to various languages. Select your target language from the dropdown menu before starting recording.

## Browser Compatibility

- **Chrome/Edge**: Full support (recommended)
- **Safari**: Full support
- **Firefox**: Limited support (may require additional configuration)

**Note**: Web Speech API requires HTTPS in production. For local development, `localhost` is allowed.

## Troubleshooting

### Microphone Not Working
- Ensure microphone permissions are granted in browser settings
- Check that your microphone is connected and working
- Try refreshing the page and granting permissions again

### Translation Not Appearing
- Verify the server is running and connected
- Check browser console for errors
- Ensure OpenAI API key is correctly configured
- Check network tab for WebSocket connection status

### Socket Connection Issues
- Verify server is running on the correct port
- Check CORS settings if accessing from different origin
- Ensure firewall isn't blocking WebSocket connections

## Development

### Code Structure

The application follows atomic design principles:
- **Atoms**: Basic building blocks (buttons, inputs)
- **Molecules**: Simple combinations (recording controls, language select)
- **Organisms**: Complex components (control panel, translation list)

### Key Hooks

- `useSpeech`: Manages speech recognition lifecycle
- `useSocket`: Handles WebSocket communication and translation state

## License

ISC

## Author

zafar

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

