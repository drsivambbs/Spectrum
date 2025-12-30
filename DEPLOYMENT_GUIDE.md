# 🚀 Spectrum PWA - Deployment Guide

## Firebase Deployment Steps

### 1. Prerequisites
- Node.js installed
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project access (spectrum-bccb4)

### 2. Initial Setup
```bash
# Clone and setup
cd Spectrum
npm install

# Login to Firebase
firebase login

# Verify project connection
firebase projects:list
```

### 3. Local Development
```bash
# Start development server
npm run dev

# App will be available at: http://localhost:3000
```

### 4. Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### 5. Deploy to Firebase
```bash
# Deploy to Firebase Hosting
npm run deploy

# Or deploy manually
firebase deploy --only hosting
```

### 6. Post-Deployment Setup

#### Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/project/spectrum-bccb4/firestore)
2. Create Firestore database in production mode
3. Apply security rules from `firestore.rules`
4. Import indexes from `firestore.indexes.json`

#### Authentication (Optional)
1. Go to Authentication > Sign-in method
2. Enable Email/Password provider
3. Configure authorized domains

### 7. Live URLs
- **Production**: https://spectrum2026.web.app
- **Firebase Console**: https://console.firebase.google.com/project/spectrum-bccb4

## Features Available

### ✅ Working Features
- User registration and management
- Local data persistence (localStorage backup)
- Firebase Firestore integration
- Responsive PWA design
- Role-based access control
- Auto-generated passwords

### 🔄 Hybrid Data Strategy
- **Primary**: Firebase Firestore
- **Backup**: localStorage (offline support)
- **Fallback**: Graceful degradation when Firebase unavailable

### 📱 PWA Capabilities
- Installable on mobile devices
- Offline functionality with localStorage
- Responsive design for all screen sizes
- Fast loading with Vite optimization

## Troubleshooting

### Build Issues
- Ensure all Firebase modules are externalized in `vite.config.ts`
- Check import map in `index.html` for correct CDN URLs

### Firebase Connection
- Verify project ID in `.firebaserc`
- Check Firebase configuration in `src/firebase/config.ts`
- Ensure Firestore rules allow read/write access

### Local Development
- Use `npm run dev` for development with hot reload
- Firebase services work in development mode
- localStorage provides offline backup

## Security Notes
- Admin credentials: `admin` / `password123` (change in production)
- Firestore rules enforce user-level access control
- All passwords auto-generated with secure patterns
- HTTPS enforced on Firebase Hosting