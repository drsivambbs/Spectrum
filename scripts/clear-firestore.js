import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGERNtEnFco8bFNKNfmKJ7o9KmkOSPoOs",
  authDomain: "spectrum-bccb4.firebaseapp.com",
  projectId: "spectrum-bccb4",
  storageBucket: "spectrum-bccb4.firebasestorage.app",
  messagingSenderId: "200830347178",
  appId: "1:200830347178:web:1b3b79d7e29e19b83cadd3",
  measurementId: "G-NS3JCTHR77"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearFirestore() {
  try {
    console.log('🗑️  Clearing Firestore database...');
    
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    console.log(`Found ${snapshot.docs.length} documents to delete`);
    
    const deletePromises = snapshot.docs.map(document => 
      deleteDoc(doc(db, 'users', document.id))
    );
    
    await Promise.all(deletePromises);
    
    console.log('✅ Firestore database cleared successfully!');
    console.log('🔄 You can now start fresh with new users.');
    
  } catch (error) {
    console.error('❌ Error clearing Firestore:', error);
  }
}

clearFirestore();