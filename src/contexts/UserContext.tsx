import React, { createContext, ReactNode, useContext, useState } from 'react'

interface UserContextData {
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>
  user: UserProps | undefined
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
  isSubscriber: boolean
  setIsSubscriber: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserProviderProps {
  children: ReactNode
}

interface UserProps {
  name: any
  email: any
  telephone: any
  isDoctor: any
  crm?: any
  institution?: any
  isSubscriber?: any
  userPhoto?: any
  dataCriacao: any
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>()
  const [userId, setUserId] = useState('')
  const [isSubscriber, setIsSubscriber] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        isSubscriber,
        setIsSubscriber
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
