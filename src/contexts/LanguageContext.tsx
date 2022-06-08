import React, { createContext, ReactNode, useContext, useState } from 'react'

interface LanguageContextData {
  language: string | null
  setLanguage: React.Dispatch<React.SetStateAction<string | null>>
}

interface LanguageProviderProps {
  children: ReactNode
}
export const LanguageContext = createContext({} as LanguageContextData)

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string | null>('')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  return useContext(LanguageContext)
}
