# Spectrum PWA - Firebase Edition

A professional user management PWA with Firebase backend integration.

## Features

- 🔥 **Firebase Integration**: Real-time database with Firestore
- 📱 **Progressive Web App**: Installable, offline-capable
- 🔐 **Authentication**: Secure user management
- 📊 **Analytics**: Firebase Analytics integration
- 🎨 **Modern UI**: Tailwind CSS with responsive design
- ⚡ **Fast Development**: Vite build system

## Firebase Setup

This project is configured to work with Firebase project: `spectrum-bccb4`

### Firebase Services Used:
- **Firestore**: User data storage
- **Analytics**: Usage tracking
- **Hosting**: Deployment to `spectrum2026.web.app`

## Local Development

**Prerequisites:** Node.js and Firebase CLI

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

3. Login to Firebase:
   ```bash
   firebase login
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

Deploy to Firebase Hosting:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to Firebase Hosting at `spectrum2026.web.app`

## Project Structure

```
Spectrum/
├── src/
│   ├── components/          # React components
│   ├── firebase/           # Firebase configuration & services
│   │   ├── config.ts       # Firebase app initialization
│   │   └── userService.ts  # Firestore user operations
│   ├── App.tsx            # Main application
│   ├── index.tsx          # Entry point
│   └── types.ts           # TypeScript definitions
├── firebase.json          # Firebase hosting configuration
├── .firebaserc           # Firebase project configuration
└── dist/                 # Build output (auto-generated)
```
