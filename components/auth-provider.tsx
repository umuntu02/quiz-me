"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("quiz-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, name: string) => {
    // In a real app, this would call an API endpoint
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      username: generateUsername(),
    };

    setUser(newUser);
    localStorage.setItem("quiz-user", JSON.stringify(newUser));
  };

  const signInWithGoogle = async () => {
    // In a real app, this would use NextAuth.js or similar
    const mockGoogleUser = {
      id: Math.random().toString(36).substring(2, 9),
      name: "Google User",
      email: "user@gmail.com",
      username: generateUsername(),
    };

    setUser(mockGoogleUser);
    localStorage.setItem("quiz-user", JSON.stringify(mockGoogleUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("quiz-user");
  };

  const generateUsername = () => {
    const adjectives = ["Happy", "Lucky", "Clever", "Brave", "Mighty", "Swift"];
    const nouns = ["Panda", "Tiger", "Eagle", "Dolphin", "Phoenix", "Dragon"];

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 100)}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
