
import { getUserAuthenticated } from "@/utils/authenUser";
import { createContext, useContext, useEffect, useState } from "react";
interface AuthContextType {
    authUser: any|null; // Change 'any' to your user type
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
  }

// export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {} // A dummy function
});


export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider :  React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const userInfo = await getUserAuthenticated(); 
	const [authUser, setAuthUser] = useState<any>(null);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const userInfo = await getUserAuthenticated();
            setAuthUser(userInfo);
          } catch (error) {
            // Handle error
            console.error("Error fetching user:", error);
          }
        };
    
        fetchUser(); // Call the fetchUser function
    }, []);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};