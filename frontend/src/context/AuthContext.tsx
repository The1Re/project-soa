import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../models/User";
import api from "../services/api";
import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

interface AuthContextType {
    user : User | null;
    login : (response:any) => void;
    logout : () => void;
    getUser : () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const login = async (response: CredentialResponse) => {
        const { credential } = response;
        const token = credential || "";
        try {
            const response = await api.post('/oauth2/callback' , {token : credential} , {withCredentials : true});
            console.log(response.data);
            localStorage.setItem("token", token);
            const userInfoResponse = await axios.get(`${import.meta.env.VITE_GOOGLE_USERINFO_URL}id_token=${credential}`);
            const userInfo:User = {
              id : userInfoResponse.data.sub,
              email : userInfoResponse.data.email,
              password : "",
              username : userInfoResponse.data.name,
              image : userInfoResponse.data.picture
            }
            setUser(userInfo);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");;
        const userInfoResponse = await axios.get(`${import.meta.env.VITE_GOOGLE_USERINFO_URL}id_token=${token}`);
        const userInfo:User = {
          id : userInfoResponse.data.sub,
          email : userInfoResponse.data.email,
          password : "",
          username : userInfoResponse.data.name,
          image : userInfoResponse.data.picture,
        }
        setUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    }

    const logout = async () => {
      try {
        const response = await api.post('/oauth2/logout');
        console.log(response.data);
        localStorage.removeItem("token");
        setUser(null);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, getUser }}>
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