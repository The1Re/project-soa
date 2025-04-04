import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../models/User";
import api from "../services/api";
import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user : User | null;
    login : (response: CredentialResponse) => void;
    logout : () => void;
    getUser : () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
  
    const login = async (response: CredentialResponse) => {
        const { credential } = response;
        const token = credential || "";
        try {
            const response = await api.post('/oauth2/callback' , {token : credential} , {withCredentials : false});
            console.log(response.data);
            localStorage.setItem("token", token);
            const userInfoResponse = await axios.get(`${import.meta.env.VITE_GOOGLE_USERINFO_URL}id_token=${credential}`  , {withCredentials : false});
            const userInfo:User = {
              id : userInfoResponse.data.sub,
              email : userInfoResponse.data.email,
              password : "",
              username : userInfoResponse.data.name,
              image : userInfoResponse.data.picture
            }
            setUser(userInfo);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          return ;
        } 
        const userInfoResponse = await axios.get(`${import.meta.env.VITE_GOOGLE_USERINFO_URL}id_token=${token}` , {withCredentials : false});
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
        navigate("/")
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