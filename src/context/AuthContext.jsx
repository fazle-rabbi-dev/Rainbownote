import { useState, useEffect, useContext, createContext } from "react";
import { getCurrentlyLoggedInUser } from "@/lib/appwrite/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const checkAuthUser = async () => {
    const account = await getCurrentlyLoggedInUser();
    
    if(!account) {
      setIsLoading(false);
    }else{
      setIsLoggedIn(true)
      setUser({
        name: account.name,
        email: account.email,
        id: account.$id,
        imageUrl: account.imageUrl
      })
      setIsLoading(false)
    }
  }
  
  const value = {
    isLoading,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    checkAuthUser
  };
  
  useEffect(() => {
    checkAuthUser();
  },[]);
  
  return(
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext);