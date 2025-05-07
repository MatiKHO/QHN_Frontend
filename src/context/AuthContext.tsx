import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserRegisterData = {
  fullName: string;
  email: string;
  password: string;
  age: number;
  location?: string | null;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: { fullName: string; email: string; age: number } | null;
  registerUser: (userData: UserRegisterData) => Promise<boolean>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;

}

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ fullName: string; email: string; age: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    setIsAuthenticated(!!token);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage", error);
        localStorage.removeItem("user"); 
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false); 
  }, []);


  
  

  const registerUser = async (userData: (UserRegisterData)) => {
    const response = await fetch(`${API_BASE}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
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
      console.log("Respuesta del servidor:", data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Error logging in:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, registerUser, login, logout, loading }}>
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