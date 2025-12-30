#!/usr/bin/env node

/**
 * Script to manually create Firestore database
 * Run this if you're getting "Service firestore is not available" errors
 */

import { execSync } from 'child_process';

console.log('🔥 Creating Firestore Database');
console.log('==============================\n');

try {
  console.log('1. Checking Firebase project...');
  const projectInfo = execSync('firebase use', { encoding: 'utf8' });
  console.log(projectInfo);

  console.log('2. Enabling Firestore API...');
  execSync('firebase firestore:databases:list', { stdio: 'inherit' });

  console.log('3. Deploying Firestore rules and indexes...');
  execSync('firebase deploy --only firestore', { stdio: 'inherit' });

  console.log('\n✅ Firestore database setup complete!');
  console.log('\n📋 Manual steps if still not working:');
  console.log('1. Go to: https://console.firebase.google.com/project/spectrum-bccb4/firestore');
  console.log('2. Click "Create database"');
  console.log('3. Choose "Start in production mode"');
  console.log('4. Select location (us-central1 recommended)');
  console.log('5. Click "Done"');
  console.log('\nThen redeploy with: npm run deploy');

} catch (error) {
  console.error('❌ Error setting up Firestore:', error.message);
  console.log('\n🔧 Manual setup required:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/spectrum-bccb4');
  console.log('2. Navigate to Firestore Database');
  console.log('3. Click "Create database"');
  console.log('4. Choose production mode and location');
  console.log('5. Redeploy the app');
}