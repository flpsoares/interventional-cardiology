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

  return (
    <ModalContext.Provider
      value={{
        modalImageIsOpen,
        openModalImage,
        closeModalImage,
        modalImageData,
        modalImageQuantity,

        modalImageOpenItem
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}
