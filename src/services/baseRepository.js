import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirebaseError } from '../utils/errorHandler';
import { serverTimestamp } from '../utils/firebaseHelpers';

/**
 * Base Repository for Firestore operations
 * Provides generic CRUD methods to be used by specific services.
 */
class BaseRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  /**
   * Get a document by ID
   * @param {string} id 
   * @returns {Object|null}
   */
  async getById(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }

  /**
   * Get all documents in the collection
   * @returns {Array}
   */
  async getAll() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }

  /**
   * Create a new document with an auto-generated ID
   * @param {Object} data 
   * @returns {string} The new document ID
   */
  async create(data) {
    try {
      const newDocRef = doc(this.collectionRef);
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(newDocRef, docData);
      return newDocRef.id;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }

  /**
   * Create or overwrite a document with a specific ID
   * @param {string} id 
   * @param {Object} data 
   */
  async set(id, data) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docData = {
        ...data,
        createdAt: data.createdAt || serverTimestamp(), // Preserve createdAt if it exists
        updatedAt: serverTimestamp(),
      };
      await setDoc(docRef, docData);
      return id;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }

  /**
   * Update an existing document
   * @param {string} id 
   * @param {Object} data 
   */
  async update(id, data) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }

  /**
   * Delete a document
   * @param {string} id 
   */
  async delete(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }

  /**
   * Query documents based on field and value
   * @param {string} field 
   * @param {string} operator (e.g., '==', '>', '<')
   * @param {any} value 
   * @returns {Array}
   */
  async getByQuery(field, operator, value) {
    try {
      const q = query(this.collectionRef, where(field, operator, value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }
}

export default BaseRepository;
