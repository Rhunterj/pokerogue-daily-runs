# Pokerogue Helper Tools

A collection of tools to help with Pokerogue daily runs, including a script helper for following walkthrough guides.

## Features

### 📜 Script Helper
- Upload daily run script PDFs or paste text directly
- Step-by-step walkthrough with progress tracking
- Quick navigation to key floors (trainers, gyms, bosses)
- Track completed floors
- Beautiful UI with custom color palette

## Setup

### Prerequisites
- Node.js 16+ and npm
- Anthropic API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pokerogue-helper.git
cd pokerogue-helper

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

The app uses the Anthropic API for AI-powered features. API calls are made client-side with no API key required (handled by Claude.ai artifacts environment).

## Usage

### Script Helper
1. Open the app and navigate to the Script Helper
2. Upload a daily run script PDF or paste the script text
3. Follow the step-by-step instructions for each floor
4. Mark floors as complete and track your progress

## Technology Stack

- React 18
- Vite
- Tailwind CSS (via CDN)
- Lucide React (icons)
- Anthropic Claude API

## Color Palette

- Primary: `#3962b4`
- Secondary: `#295294`
- Dark: `#313973`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project however you'd like!

## Acknowledgments

- Daily run scripts by @trainerbchara
- Pokerogue game by its developers
- Pokerogue Wiki community

## Disclaimer

This is a fan-made tool and is not affiliated with or endorsed by the Pokerogue developers.