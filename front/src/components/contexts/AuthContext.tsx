"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useCookies } from "next-client-cookies";

type User = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  token: object | null;
  createdAt: string;
  updatedAt: string;
  transaction: any[];
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = useCookies();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    cookies.set("token", userData.token.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
