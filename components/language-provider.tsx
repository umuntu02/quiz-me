"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations = {
  en: {
    welcome: "Welcome to QuizMaster!",
    solo_mode: "Solo Mode",
    multiplayer_mode: "Multiplayer Mode",
    play_now: "Play Now",
    sign_in: "Sign In",
    sign_out: "Sign Out",
    profile: "Profile",
    leaderboard: "Leaderboard",
    // Add more translations as needed
  },
  fr: {
    welcome: "Bienvenue sur QuizMaster !",
    solo_mode: "Mode Solo",
    multiplayer_mode: "Mode Multijoueur",
    play_now: "Jouer Maintenant",
    sign_in: "Se Connecter",
    sign_out: "Se Déconnecter",
    profile: "Profil",
    leaderboard: "Classement",
    // Add more translations as needed
  },
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState("en")

  useEffect(() => {
    const storedLanguage = localStorage.getItem("quiz-language")
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    }
  }, [])

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem("quiz-language", lang)
  }

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

