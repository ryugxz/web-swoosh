/**
 * Auth Service
 * Manages Firebase Authentication operations
 */
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { handleFirebaseError } from '../utils/errorHandler';
import { userService } from './userService';

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // After login, update lastLogin
    await userService.updateLastLogin(userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    throw handleFirebaseError(error);
  }
};

export const register = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create the Firestore profile
    await userService.createUserProfile(user.uid, {
      ...userData,
      email: user.email,
    });

    // Send verification email
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    throw handleFirebaseError(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw handleFirebaseError(error);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw handleFirebaseError(error);
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

