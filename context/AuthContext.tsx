"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 保存したいデータの形を定義
interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ブラウザをリロードしても消えないように、起動時にlocalStorageから読み込む
  useEffect(() => {
    const savedName = localStorage.getItem("user_name");
    const savedEmail = localStorage.getItem("user_email");
    if (savedName && savedEmail) {
      setUser({ name: savedName, email: savedEmail });
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user_name", userData.name);
    localStorage.setItem("user_email", userData.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 他のファイルから使いやすくするためのHook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};