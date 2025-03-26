"use client"

import { useContext } from "react"
import { LanguageContext } from "@/components/language-provider"

export const useLanguage = () => useContext(LanguageContext)

