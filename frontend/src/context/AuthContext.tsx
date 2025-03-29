import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../models/User";
import api from "../services/api";
import { CredentialResponse } from "@react-oauth/google";

interface AuthContextType {
    user : User | null;
    login : (response:any) => void;
    logout : () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const login = async (response: CredentialResponse) => {
        const { credential } = response;
        console.log("Auth : ",credential);
        try {
            const response = await api.post('/oauth2/callback' , {token : credential} , {withCredentials : true});
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth ต้องใช้ภายใน AuthProvider");
    }
    return context;
  };