import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserRegisterData = {
  fullName: string;
  email: string;
  password: string;
  age: number;
  childrenAges?: string | null;
  numberChildren?: number | null;
  genderChildren?: string | null;
  location?: string | null;
};

interface AuthContextType {
  isAuthenticated: boolean;
  registerUser: (userData: UserRegisterData) => Promise<boolean>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;

}

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const registerUser = async (userData: (UserRegisterData)) => {
    const response = await fetch(`${API_BASE}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
      numberChildren: userData.numberChildren ?? null,
      genderChildren: userData.genderChildren ?? null,
      location: userData.location ?? null,
      }),
      
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Error al registrar el usuario");
    }
  
    return data; 
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/profile");
      } else {
        console.error("Error logging in:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, registerUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    };

    return context;
};