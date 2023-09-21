// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [authToken, setAuthToken] = useState(null); // Add authToken state

  const updateUser = (newUserData,token) => {
    console.log('New user data:', newUserData);
    setUserData(newUserData);
    setAuthToken(token); // Set the authToken when updating the user data
  };

  return (
    <UserContext.Provider value={{ userData,authToken, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
