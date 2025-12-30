// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGERNtEnFco8bFNKNfmKJ7o9KmkOSPoOs",
  authDomain: "spectrum-bccb4.firebaseapp.com",
  projectId: "spectrum-bccb4",
  storageBucket: "spectrum-bccb4.firebasestorage.app",
  messagingSenderId: "200830347178",
  appId: "1:200830347178:web:1b3b79d7e29e19b83cadd3",
  measurementId: "G-NS3JCTHR77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics: any = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}
export { analytics };

console.log('Firebase initialized successfully');

export default app;