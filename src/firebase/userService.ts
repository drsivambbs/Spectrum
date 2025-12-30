import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from './config';
import { User } from '../types';

const USERS_COLLECTION = 'users';

export class UserService {
  // Test Firestore connection
  static async testConnection(): Promise<boolean> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      await getDocs(usersRef);
      console.log('Firestore connection successful');
      return true;
    } catch (error) {
      console.error('Firestore connection failed:', error);
      return false;
    }
  }

  // Get all users
  static async getAllUsers(): Promise<User[]> {
    try {
      console.log('Attempting to fetch users from Firestore...');
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User));
      
      console.log(`Successfully fetched ${users.length} users from Firestore`);
      return users;
    } catch (error) {
      console.error('Error fetching users from Firestore:', error);
      throw error;
    }
  }

  // Add new user
  static async addUser(userData: Omit<User, 'id'>): Promise<string> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const docRef = await addDoc(usersRef, {
        ...userData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userRef, userData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      await deleteDoc(userRef);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Check if mobile number exists
  static async checkMobileExists(mobileNumber: string, excludeUserId?: string): Promise<boolean> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, where('mobileNumber', '==', mobileNumber));
      const querySnapshot = await getDocs(q);
      
      if (excludeUserId) {
        return querySnapshot.docs.some(doc => doc.id !== excludeUserId);
      }
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking mobile number:', error);
      throw error;
    }
  }

  // Find user by mobile and password (for login)
  static async findUserByCredentials(mobileNumber: string, password: string): Promise<User | null> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(
        usersRef, 
        where('mobileNumber', '==', mobileNumber),
        where('password', '==', password)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    } catch (error) {
      console.error('Error finding user by credentials:', error);
      throw error;
    }
  }
}