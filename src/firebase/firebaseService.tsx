// firebaseService.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Assuming firebaseConfig initializes Firebase

// Function to get data from the "users" collection
export const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "app_users"));
    const usersList: any[] = [];
    querySnapshot.forEach((doc) => {
      usersList.push({ id: doc.id, ...doc.data() });
    });
    console.log('usersList', usersList);
    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

