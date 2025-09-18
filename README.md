# HeadStarter Support Agent

A real-time AI-powered chat application built with Next.js and OpenAI GPT-4. This application provides intelligent customer support for HeadStartAI, helping entrepreneurs and startups with business advice, planning, and guidance.

## Features

- 🤖 **Real-time AI Chat**: Streaming responses with character-by-character display
- 💬 **Modern UI**: Clean, responsive chat interface built with Material-UI
- ⚡ **Fast Performance**: Built with Next.js 14 for optimal performance
- 🔒 **Secure**: Environment variable protection for API keys
- 📱 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, Material-UI
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4 Turbo
- **Styling**: Material-UI (MUI) components
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SWEAbdul/AI-Custom.git
   cd AI-Custom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Start a conversation**: Type your message in the input field
2. **Send messages**: Click "Send" or press Enter
3. **Real-time responses**: Watch as the AI responds character by character
4. **Get business advice**: Ask about startups, business planning, marketing, etc.

## API Endpoints

- `POST /api/chat` - Send messages to the AI assistant

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms

This app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@headstartai.com or create an issue in this repository.

---

Built with ❤️ for entrepreneurs and startups
