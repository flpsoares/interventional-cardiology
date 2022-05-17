import React, { createContext, useContext, ReactNode, useState } from 'react'

interface ModalContextData {
  modalImageIsOpen: boolean
  openModalImage: (data: string[], quantity: number, openItem: number) => void
  closeModalImage: () => void
  modalImageData: string[] | undefined
  modalImageQuantity: number
  modalImageOpenItem: number
  postDropdownIsOpen: boolean
  postDropdownUserName: string
  openPostDropdown: (name: string) => void
  closePostDropdown: () => void
  modalChoosePlanIsOpen: boolean
  openModalChoosePlan: () => void
  closeModalChoosePlan: () => void
  modalMedicineIsOpen: boolean
  openModalMedicine: () => void
  closeModalMedicine: () => void
  selectedMedicines: string[]
  setSelectedMedicines: React.Dispatch<React.SetStateAction<string[]>>
}

interface ModalProviderProps {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalImageIsOpen, setModalImageIsOpen] = useState(false)
  const [modalImageData, setModalImageData] = useState<string[]>()
  const [modalImageQuantity, setModalImageQuantity] = useState(0)
  const [modalImageOpenItem, setModalImageOpenItem] = useState(0)

  const [modalMedicineIsOpen, setModalMedicineIsOpen] = useState(false)
  const [selectedMedicines, setSelectedMedicines] = useState([''])

  const [modalChoosePlanIsOpen, setModalChoosePlanIsOpen] = useState(false)

  const [postDropdownIsOpen, setPostDropdownIsOpen] = useState(false)
  const [postDropdownUserName, setPostDropdownUserName] = useState('')

  const openModalImage = (data: string[], quantity: number, openItem: number) => {
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

  const openModalChoosePlan = () => {
    setModalChoosePlanIsOpen(true)
  }

  const closeModalChoosePlan = () => {
    setModalChoosePlanIsOpen(false)
  }
  const openModalMedicine = () => {
    setModalMedicineIsOpen(true)
  }

  const closeModalMedicine = () => {
    setModalMedicineIsOpen(false)
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
        closePostDropdown,
        modalChoosePlanIsOpen,
        openModalChoosePlan,
        closeModalChoosePlan,
        modalMedicineIsOpen,
        openModalMedicine,
        closeModalMedicine,
        selectedMedicines,
        setSelectedMedicines
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}
