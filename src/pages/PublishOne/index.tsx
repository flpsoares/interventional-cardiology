import React, { useCallback, useState } from 'react'
import {
  Button,
  Container,
  HalfItem,
  HalfItemArea,
  Header,
  Input,
  InputItem,
  InputTitle,
  MedicinePreview,
  MedicineText,
  ModalButton,
  ModalButtonText,
  PickerButton,
  SubmitButton,
  SubmitButtonText,
  Title,
  UserPhoto,
  Wrapper
} from './style'

import { Picker } from '@react-native-picker/picker'
import { useNavigate } from '../../contexts/NavigateContext'
import { Alert } from 'react-native'
import { useUser } from '../../contexts/UserContext'
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { useModal } from '../../contexts/ModalContext'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import Modal from 'react-native-modal'
import MultiSelect from 'react-native-multiple-select'
import { secondary } from '../../styles/globalCssVar'

export const PublishOne: React.FC = () => {
  const { user } = useUser()
  const { navigateToPublish } = useNavigate()
  const {
    modalChoosePlanIsOpen,
    openModalChoosePlan,
    openModalMedicine,
    modalMedicineIsOpen,
    closeModalMedicine
  } = useModal()

  const isFocused = useIsFocused()

  const [area, setArea] = useState('Doença coronariana')
  const [idade, setIdade] = useState('')
  const [genero, setGenero] = useState('Masculino')
  const [sintoma, setSintoma] = useState('Dor precordial')
  const [comorbidades, setComorbidades] = useState('Hipertensão arterial sistêmica')
  const [medicamentos, setMedicamentos] = useState<string[]>([])

  const items = [
    {
      id: '1',
      name: 'Medicamento 1'
    },
    {
      id: '2',
      name: 'Medicamento 2'
    },
    {
      id: '3',
      name: 'Medicamento 3'
    },
    {
      id: '4',
      name: 'Medicamento 4'
    },
    {
      id: '5',
      name: 'Medicamento 5'
    },
    {
      id: '6',
      name: 'Medicamento 6'
    }
  ]

  const clear = () => {
    setArea('Doença coronariana')
    setIdade('')
    setGenero('Masculino')
    setComorbidades('Hipertensão arterial sistêmica')
    setMedicamentos([])
    setSintoma('')
  }

  const handleSubmit = () => {
    if (idade !== '') {
      clear()
      navigateToPublish(area, genero, idade, sintoma, comorbidades, medicamentos)
    } else {
      Alert.alert('Aviso', 'Preencha todos os campos')
    }
  }
  useFocusEffect(
    useCallback(() => {
      if (user?.isSubscriber === false) {
        openModalChoosePlan()
      }
    }, [isFocused])
  )

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      {modalChoosePlanIsOpen && <ModalChoosePlan />}
      <Header>
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <Title>Publicar caso clínico</Title>
        <Button></Button>
      </Header>
      <Wrapper>
        <InputItem>
          <InputTitle>Escolha a Área</InputTitle>
          <PickerButton style={{ elevation: 10 }}>
            <Picker
              style={{ color: 'rgba(77, 86, 109, 1)' }}
              dropdownIconColor="rgba(77, 86, 109, 1)"
              selectedValue={area}
              onValueChange={(value) => setArea(value)}
            >
              <Picker.Item label="Doença coronariana" value="Doença coronariana" />
              <Picker.Item label="Valvopatia" value="Valvopatia" />
              <Picker.Item
                label="Cardiopatias congênitas"
                value="Cardiopatias congênitas"
              />
              <Picker.Item label="Arritmias" value="Arritmias" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>
          </PickerButton>
        </InputItem>
        <HalfItemArea>
          <HalfItem>
            <InputTitle>Idade</InputTitle>
            <Input
              keyboardType="number-pad"
              style={{ elevation: 10 }}
              placeholder="Digite aqui..."
              value={idade}
              onChangeText={(value) => setIdade(value)}
            />
          </HalfItem>
          <HalfItem>
            <InputTitle>Gênero</InputTitle>
            <PickerButton style={{ elevation: 10 }}>
              <Picker
                style={{ color: 'rgba(77, 86, 109, 1)' }}
                dropdownIconColor="rgba(77, 86, 109, 1)"
                selectedValue={genero}
                onValueChange={(value) => setGenero(value)}
              >
                <Picker.Item label="Masculino" value={true} />
                <Picker.Item label="Feminino" value={false} />
              </Picker>
            </PickerButton>
          </HalfItem>
        </HalfItemArea>
        <InputItem>
          <InputTitle>Sintomas</InputTitle>
          <PickerButton style={{ elevation: 10 }}>
            <Picker
              style={{ color: 'rgba(77, 86, 109, 1)' }}
              dropdownIconColor="rgba(77, 86, 109, 1)"
              selectedValue={sintoma}
              onValueChange={(value) => setSintoma(value)}
            >
              <Picker.Item label="Dor precordial" value="Dor precordial" />
              <Picker.Item label="Dispnéia" value="Dispnéia" />
              <Picker.Item label="Palpitações" value="Palpitações" />
              <Picker.Item label="Síncope" value="Síncope" />
              <Picker.Item label="Cianose" value="Cianose" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>
          </PickerButton>
        </InputItem>
        <InputItem>
          <InputTitle>Comorbidades</InputTitle>
          <PickerButton style={{ elevation: 10 }}>
            <Picker
              style={{ color: 'rgba(77, 86, 109, 1)' }}
              dropdownIconColor="rgba(77, 86, 109, 1)"
              selectedValue={comorbidades}
              onValueChange={(value) => setComorbidades(value)}
            >
              <Picker.Item
                label="Hipertensão arterial sistêmica"
                value="Hipertensão arterial sistêmica"
              />
              <Picker.Item label="Diabetes melitus" value="Diabetes melitus" />
              <Picker.Item label="Dislipidemia" value="Dislipidemia" />
              <Picker.Item label="Obesidade" value="Obesidade" />
              <Picker.Item label="Sedentarismo" value="Sedentarismo" />
              <Picker.Item label="Tabagismo" value="Tabagismo" />
              <Picker.Item label="Doença renal" value="Doença renal" />
              <Picker.Item
                label="Doença coronariana previamente conhecida"
                value="Doença coronariana previamente conhecida"
              />
              <Picker.Item
                label="Histórico familiar para coronariopatia"
                value="Histórico familiar para coronariopatia"
              />
              <Picker.Item label="Sem comorbidades" value="Sem comorbidades" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>
          </PickerButton>
        </InputItem>
        <InputItem>
          <InputTitle>Medicamentos em Uso</InputTitle>
          <ModalButton onPress={openModalMedicine}>
            <ModalButtonText>Selecionar medicamentos</ModalButtonText>
          </ModalButton>
        </InputItem>
        {modalMedicineIsOpen && (
          <Modal
            isVisible={modalMedicineIsOpen}
            onBackdropPress={closeModalMedicine}
            onBackButtonPress={closeModalMedicine}
          >
            <Wrapper>
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="name"
                onSelectedItemsChange={setMedicamentos}
                selectedItems={medicamentos}
                selectText="Selecione os medicamentos"
                searchInputPlaceholderText="Pesquise os medicamentos..."
                hideSubmitButton
                hideDropdown
                selectedItemTextColor={secondary}
                selectedItemIconColor={secondary}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC', height: 50, fontSize: 16 }}
              />
            </Wrapper>
          </Modal>
        )}
        <MedicinePreview>
          {medicamentos?.map((med, index) => {
            return <MedicineText key={index}>{med}</MedicineText>
          })}
        </MedicinePreview>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Prosseguir</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}
