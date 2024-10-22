// AuthService for handling logged-in user details
const AuthService = (() => {
    let loggedInUserInfo: any = null; // Private variable to store user info
  
    // Setter for logged-in user information
    const setLoggedInUserInfo = (userInfo: any) => {
      loggedInUserInfo = userInfo;
    };
  
    // Getter for logged-in user information
    const getLoggedInUserInfo = () => {
      return loggedInUserInfo;
    };
  
    // Method to check if the user is logged in
    const isLoggedIn = (isLogged) => {
      return loggedInUserInfo = isLogged;
    };
  
    // Method to clear user info (e.g., for logging out)
    const clearUserInfo = () => {
      loggedInUserInfo = null;
    };
  
    // Return the methods as an object
    return {
      setLoggedInUserInfo,
      getLoggedInUserInfo,
      isLoggedIn,
      clearUserInfo,
    };
  })();
  
  export default AuthService;