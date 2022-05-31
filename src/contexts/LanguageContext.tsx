import React, { createContext, ReactNode, useContext, useState } from 'react'

interface LanguageContextData {
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

interface LanguageProviderProps {
  children: ReactNode
}
export const LanguageContext = createContext({} as LanguageContextData)

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState('en')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  return useContext(LanguageContext)
}
