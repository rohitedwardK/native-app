import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Assuming you have the Firebase initialized in this file
import { useNavigation } from '@react-navigation/native';
import AuthService from '../auth/AuthService';

// Function to handle sign-in and user data
export async function signInAndFetchUserData(user) {
  try {
    // Reference to the "app_users" collection
    const appUsersCollectionRef = collection(db, "app_users");
    const appUsersSnapshot = await getDocs(appUsersCollectionRef);

    let userExists = false;

    // Check if the user already exists in the "app_users" collection
    for (const docSnap of appUsersSnapshot.docs) {
      if (docSnap.id === user.uid) {
        userExists = true;
        console.log('user exists');
        break;
      }
    }

    // If the user does not exist, add them to the "app_users" collection
    if (!userExists) {
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        firstName: '',
        lastName: '',
        email: user.email,
        photoURL: user.photoURL,
        role: 'user', // Default role, you can change it to 'admin' if needed
        createdAt: new Date(),
        referal: '',
        my_referal: []
      };

      // Add the new user to the "app_users" collection
      await setDoc(doc(db, "app_users", user.uid), userData);
      console.log("New user added to app_users collection:", userData);
    }

    // Fetch the user details and set loggedInUserInfo
    return await fetchUserDetails(user);

  } catch (error) {
    console.error("Error during sign-in:", error);
  }
}

// Function to fetch user details after login
export const fetchUserDetails = async (loggedInUser) => {
  try {
    console.log(loggedInUser);
    // Reference to the "app_users" collection
    const userDoc = doc(db, "app_users", loggedInUser.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const userInfo = docSnap.data();

      // Set the user information in AuthService for future use
      AuthService.setLoggedInUserInfo(userInfo);

    // Redirect based on user role
    return userInfo;
    } else {
      console.error("User data not found");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

// // Function to handle admin or user redirection
export const adminRedirection = async (userRole) => {
    console.log(userRole);
    const navigation = useNavigation<any>(); // Access navigation
  if (userRole === 'admin') {
    
    navigation.replace('HomeScreen'); // Redirect to Admin Screen if the user is an admin
  } else {
    navigation.replace('Main'); // Redirect to Home Screen for regular users
  }
};

