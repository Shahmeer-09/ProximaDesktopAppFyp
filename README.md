# Proxima Desktop App

A comprehensive desktop application for screen recording, transcription, and content management with cloud integration.

## Project Overview

Proxima Desktop App is a multi-component application that provides screen recording capabilities with cloud storage, transcription services, and content management. The application consists of three main components:

1. **proximadesk** - A Next.js web application that serves as the main interface for content management
2. **proximadesk-desktop** - An Electron-based desktop application for screen recording and capture
3. **proximaExpress** - A Node.js Express server that handles video processing, transcription, and cloud storage

## Architecture

The application follows a microservices architecture:

- **Frontend**: Next.js web application (proximadesk)
- **Desktop Client**: Electron application (proximadesk-desktop)
- **Backend**: Express.js server (proximaExpress)
- **Storage**: AWS S3 for video storage
- **AI Services**: Integration with various AI services for transcription and summarization

## Features

- Screen recording and capture
- Video upload to AWS S3
- Automatic transcription of recordings
- AI-powered title and summary generation
- User authentication via Clerk
- Floating webcam overlay
- Studio mode for recording
- PRO plan features with enhanced AI capabilities

## Technology Stack

### proximadesk (Next.js Web App)
- Next.js 15.x
- React 19.x
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Prisma ORM
- Redux for state management
- Radix UI components
- Three.js for 3D visualizations

### proximadesk-desktop (Electron App)
- Electron
- Vite
- React
- TypeScript
- Tailwind CSS
- Socket.io for real-time communication

### proximaExpress (Backend Server)
- Express.js
- Socket.io
- AWS SDK for S3 integration
- AI services integration (Azure, Google)
- Video processing capabilities

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn
- AWS account with S3 bucket
- AI service credentials (Azure, Google)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ProximaDesktopApp.git
cd ProximaDesktopApp
```

2. Set up the Next.js web app:
```bash
cd proximadesk
npm install
cp .env.example .env # Configure your environment variables
npm run dev
```

3. Set up the Express server:
```bash
cd ../proximaExpress
npm install
cp .env.example .env # Configure your environment variables
npm run dev
```

4. Set up the Electron desktop app:
```bash
cd ../proximadesk-desktop
npm install
cp .env.example .env # Configure your environment variables
npm run dev
```

## Environment Variables

Each component requires specific environment variables:

### proximadesk (Next.js)
- Database connection strings
- Clerk API keys
- API endpoints

### proximaExpress (Backend)
- AWS credentials (ACCESS_KEY_ID, SECRET_ACCESS_KEY)
- BUCKET_NAME for S3
- NEXT_HOST_URL for API communication
- ELECTRON_HOST_URL for desktop app communication

### proximadesk-desktop (Electron)
- VITE_HOST_URL for API communication
- VITE_LOCAL_URL for local development

## Development Workflow

1. Start the Next.js app (`npm run dev` in proximadesk directory)
2. Start the Express server (`npm run dev` in proximaExpress directory)
3. Start the Electron app (`npm run dev` in proximadesk-desktop directory)

## Building for Production

### Web App
```bash
cd proximadesk
npm run build
npm run start
```

### Express Server
```bash
cd proximaExpress
npm run 
```

### Desktop App
```bash
cd proximadesk-desktop
npm run build
```

## License

[ISC License]

## Contributors

- Your development team