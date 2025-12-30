#!/usr/bin/env node

/**
 * Pre-deployment verification script
 * Ensures everything is ready for Firebase deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Pre-Deployment Verification');
console.log('==============================\n');

let allChecksPass = true;

// Check 1: Firebase CLI installed
try {
  const version = execSync('firebase --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Firebase CLI: v${version}`);
} catch (e) {
  console.log('❌ Firebase CLI not installed');
  allChecksPass = false;
}

// Check 2: Project build
try {
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build successful');
} catch (e) {
  console.log('❌ Build failed');
  allChecksPass = false;
}

// Check 3: Dist directory exists
if (fs.existsSync(path.join(__dirname, '..', 'dist'))) {
  console.log('✅ Dist directory exists');
} else {
  console.log('❌ Dist directory missing');
  allChecksPass = false;
}

// Check 4: Firebase project connection
try {
  const output = execSync('firebase use', { encoding: 'utf8' });
  if (output.includes('spectrum-bccb4')) {
    console.log('✅ Firebase project connected (spectrum-bccb4)');
  } else {
    console.log('❌ Wrong Firebase project');
    allChecksPass = false;
  }
} catch (e) {
  console.log('❌ Firebase project not connected');
  allChecksPass = false;
}

// Check 5: Firebase configuration
try {
  const firebaseJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'firebase.json'), 'utf8'));
  if (firebaseJson.hosting && firebaseJson.hosting.site === 'spectrum2026') {
    console.log('✅ Firebase hosting configured (spectrum2026)');
  } else {
    console.log('❌ Firebase hosting misconfigured');
    allChecksPass = false;
  }
} catch (e) {
  console.log('❌ Firebase configuration error');
  allChecksPass = false;
}

console.log('');

// Final verdict
if (allChecksPass) {
  console.log('🎉 All checks passed! Ready for deployment');
  console.log('');
  console.log('🚀 Deploy with: npm run deploy');
  console.log('🌐 Live URL: https://spectrum2026.web.app');
  console.log('📊 Console: https://console.firebase.google.com/project/spectrum-bccb4');
} else {
  console.log('❌ Some checks failed. Please fix issues before deploying.');
  process.exit(1);
}

console.log('');