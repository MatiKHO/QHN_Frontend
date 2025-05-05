import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  registerUser: (userData: { fullName: string; email: string; password: string }) => Promise<boolean>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const registerUser = async (userData: { fullName: string; email: string; password: string }) => {
    try {
        console.log("Datos enviados al backend:", userData); 
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Respuesta del backend (raw):", response); // Log para verificar la respuesta cruda


      const data = await response.json();
      console.log("Respuesta del backend:", data); 
      if (response.ok) {
        console.log("User registered successfully:", data);
        return true; // Indica que el registro fue exitoso
      } else {
        console.error("Error registering user:", data.error);
        throw new Error(data.error || "Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
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