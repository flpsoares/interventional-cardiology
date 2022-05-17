import React, { useEffect, useState } from 'react'
import { Container, Wrapper } from './style'
import Modal from 'react-native-modal'
import { useModal } from '../../contexts/ModalContext'

interface MedicineProps {
  label: string
  value: string
}

export const ModalMedicinesSelect: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState([])
  const options = ['medicamento1', 'medicamento2', 'medicamento3']

  // useEffect(() => {
  //   if (selectedMedicines !== undefined) {
  //     if (medicamentos !== undefined) {
  //       setSelectedMedicines([...selectedMedicines, medicamentos?.value])
  //     }
  //   } else {
  //     if (medicamentos !== undefined) {
  //       setSelectedMedicines([medicamentos?.value])
  //     }
  //   }
  // }, [medicamentos])

  return <Container></Container>
}
