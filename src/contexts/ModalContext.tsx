import React, { createContext, useContext, ReactNode, useState } from 'react'
import { ImageSourcePropType } from 'react-native'

interface ModalContextData {
  modalImageIsOpen: boolean
  openModalImage: (
    data: ImageSourcePropType[],
    quantity: number,
    openItem: number
  ) => void
  closeModalImage: () => void
  modalImageData: ImageSourcePropType[] | undefined
  modalImageQuantity: number
  modalImageOpenItem: number
  postDropdownIsOpen: boolean
  postDropdownUserName: string
  openPostDropdown: (name: string) => void
  closePostDropdown: () => void
}

interface ModalProviderProps {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalImageIsOpen, setModalImageIsOpen] = useState(false)
  const [modalImageData, setModalImageData] = useState<ImageSourcePropType[]>()
  const [modalImageQuantity, setModalImageQuantity] = useState(0)
  const [modalImageOpenItem, setModalImageOpenItem] = useState(0)

  const [postDropdownIsOpen, setPostDropdownIsOpen] = useState(false)
  const [postDropdownUserName, setPostDropdownUserName] = useState('')

  const openModalImage = (
    data: ImageSourcePropType[],
    quantity: number,
    openItem: number
  ) => {
    setModalImageIsOpen(true)
    setModalImageData(data)
    setModalImageQuantity(quantity)
    setModalImageOpenItem(openItem)
  }

  const closeModalImage = () => {
    setModalImageIsOpen(false)
    setModalImageData(undefined)
    setModalImageQuantity(0)
  }

  const openPostDropdown = (name: string) => {
    setPostDropdownIsOpen(true)
    setPostDropdownUserName(name)
  }

  const closePostDropdown = () => {
    setPostDropdownIsOpen(false)
    setPostDropdownUserName('')
  }

  return (
    <ModalContext.Provider
      value={{
        modalImageIsOpen,
        openModalImage,
        closeModalImage,
        modalImageData,
        modalImageQuantity,
        modalImageOpenItem,
        postDropdownIsOpen,
        postDropdownUserName,
        openPostDropdown,
        closePostDropdown
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}
