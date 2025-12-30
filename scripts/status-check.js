#!/usr/bin/env node

/**
 * Spectrum PWA Status Check
 * Verifies project configuration and readiness
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Spectrum PWA Status Check');
console.log('============================\n');

// Check essential files
const essentialFiles = [
  'package.json',
  'firebase.json',
  '.firebaserc',
  'src/firebase/config.ts',
  'src/firebase/userService.ts',
  'src/App.tsx',
  'src/components/UserManagement.tsx',
  'src/components/Login.tsx',
  'firestore.rules',
  'firestore.indexes.json'
];

let allFilesExist = true;

console.log('📁 Essential Files Check:');
essentialFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('');

// Check package.json scripts
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  console.log('📦 Package Scripts:');
  console.log(`   ✅ dev: ${packageJson.scripts.dev}`);
  console.log(`   ✅ build: ${packageJson.scripts.build}`);
  console.log(`   ✅ deploy: ${packageJson.scripts.deploy}`);
  console.log('');
} catch (e) {
  console.log('❌ Error reading package.json\n');
}

// Check Firebase config
try {
  const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'firebase.json'), 'utf8'));
  console.log('🔥 Firebase Configuration:');
  console.log(`   ✅ Hosting site: ${firebaseConfig.hosting.site}`);
  console.log(`   ✅ Public directory: ${firebaseConfig.hosting.public}`);
  console.log(`   ✅ Firestore rules: ${firebaseConfig.firestore ? '✅' : '❌'}`);
  console.log('');
} catch (e) {
  console.log('❌ Error reading firebase.json\n');
}

// Check project config
try {
  const firebaseRc = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.firebaserc'), 'utf8'));
  console.log('🎯 Project Configuration:');
  console.log(`   ✅ Default project: ${firebaseRc.projects.default}`);
  console.log('');
} catch (e) {
  console.log('❌ Error reading .firebaserc\n');
}

// Final status
console.log('🎯 Overall Status:');
if (allFilesExist) {
  console.log('   ✅ All essential files present');
  console.log('   ✅ Ready for development and deployment');
  console.log('');
  console.log('🚀 Next Steps:');
  console.log('   1. npm install');
  console.log('   2. npm run dev (for development)');
  console.log('   3. npm run deploy (for production)');
} else {
  console.log('   ❌ Missing essential files');
  console.log('   ⚠️  Project setup incomplete');
}

console.log('');