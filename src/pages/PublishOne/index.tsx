import { Picker } from '@react-native-picker/picker'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import Modal from 'react-native-modal'
import MultiSelect from 'react-native-multiple-select'
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { useUser } from '../../contexts/UserContext'
import { secondary } from '../../styles/globalCssVar'
import {
  Button,
  Container,
  HalfItem,
  HalfItemArea,
  Header,
  Input,
  InputItem,
  InputTitle,
  ItemPreview,
  ItemText,
  ModalButton,
  ModalButtonText,
  PickerButton,
  SubmitButton,
  SubmitButtonText,
  Title,
  UserPhoto,
  Wrapper
} from './style'
export const PublishOne: React.FC = () => {
  const { user } = useUser()
  const { navigateToPublish } = useNavigate()
  const { modalChoosePlanIsOpen, openModalChoosePlan } = useModal()

  const [modalMedicineIsOpen, setModalMedicineIsOpen] = useState(false)
  const closeModalMedicine = () => setModalMedicineIsOpen(false)
  const openModalMedicine = () => setModalMedicineIsOpen(true)

  const [modalAreaIsOpen, setModalAreaIsOpen] = useState(false)
  const closeModalArea = () => setModalAreaIsOpen(false)
  const openModalArea = () => setModalAreaIsOpen(true)

  const [modalComorbidityIsOpen, setModalComorbidityIsOpen] = useState(false)
  const closeModalComorbidity = () => setModalComorbidityIsOpen(false)
  const openModalComorbidity = () => setModalComorbidityIsOpen(true)

  const [modalSymptomIsOpen, setModalSymptomIsOpen] = useState(false)
  const closeModalSymptom = () => setModalSymptomIsOpen(false)
  const openModalSymptom = () => setModalSymptomIsOpen(true)

  const isFocused = useIsFocused()

  const [area, setArea] = useState<string[]>([])
  const [idade, setIdade] = useState('')
  const [genero, setGenero] = useState('Masculino')
  const [sintoma, setSintoma] = useState<string[]>([])
  const [comorbidades, setComorbidades] = useState<string[]>([])
  const [medicamentos, setMedicamentos] = useState<string[]>([])

  const areaItems = [
    {
      id: '1',
      name: 'Doença coronariana'
    },
    {
      id: '2',
      name: 'Valvopatia'
    },
    {
      id: '3',
      name: 'Cardiopatias congênitas'
    },
    {
      id: '4',
      name: 'Arritmias'
    },
    {
      id: '5',
      name: 'Outros'
    }
  ]

  const sintomasItems = [
    {
      id: '1',
      name: 'Dor precordial'
    },
    {
      id: '2',
      name: 'Dispnéia'
    },
    {
      id: '3',
      name: 'Palpitações'
    },
    {
      id: '4',
      name: 'Síncope'
    },
    {
      id: '5',
      name: 'Cianose'
    },
    {
      id: '6',
      name: 'Outros'
    }
  ]

  const comorbidadesItems = [
    {
      id: '1',
      name: 'Hipertensão arterial sistêmica'
    },
    {
      id: '2',
      name: 'Diabetes melitus'
    },
    {
      id: '3',
      name: 'Dislipedemia'
    },
    {
      id: '4',
      name: 'Obesidade'
    },
    {
      id: '5',
      name: 'Sedentarismo'
    },
    {
      id: '6',
      name: 'Tabagismo'
    },
    {
      id: '7',
      name: 'Doença renal'
    },
    {
      id: '8',
      name: 'Doença coronariana previamente conhecida'
    },
    {
      id: '9',
      name: 'Histórico familiar para coronariopatia'
    },
    {
      id: '10',
      name: 'Sem comorvidades'
    },
    {
      id: '11',
      name: 'Outros'
    }
  ]

  const medicamentosItems = [
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
    },
    {
      id: '7',
      name: 'Medicamento 7'
    },
    {
      id: '8',
      name: 'Medicamento 8'
    },
    {
      id: '9',
      name: 'Medicamento 9'
    },
    {
      id: '10',
      name: 'Medicamento 10'
    },
    {
      id: '11',
      name: 'Medicamento 11'
    },
    {
      id: '12',
      name: 'Medicamento 12'
    }
  ]

  const clear = () => {
    setArea([])
    setIdade('')
    setGenero('Masculino')
    setComorbidades([])
    setMedicamentos([])
    setSintoma([])
  }

  const handleSubmit = () => {
    if (
      idade !== '' &&
      area[0] !== '' &&
      sintoma[0] !== '' &&
      comorbidades[0] !== '' &&
      medicamentos[0] !== ''
    ) {
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
          <ModalButton onPress={openModalArea}>
            <ModalButtonText>Selecionar áreas</ModalButtonText>
          </ModalButton>
        </InputItem>
        {modalAreaIsOpen && (
          <Modal
            isVisible={modalAreaIsOpen}
            onBackdropPress={closeModalArea}
            onBackButtonPress={closeModalArea}
          >
            <Wrapper>
              <MultiSelect
                hideTags
                items={areaItems}
                uniqueKey="name"
                onSelectedItemsChange={setArea}
                selectedItems={area}
                selectText="Selecione as áreas"
                searchInputPlaceholderText="Pesquise as áreas..."
                hideSubmitButton
                hideDropdown
                styleDropdownMenuSubsection={{
                  alignItems: 'center',
                  height: 70,
                  paddingLeft: 20
                }}
                selectedItemTextColor={secondary}
                selectedItemIconColor={secondary}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{
                  color: '#000',
                  height: 70,
                  fontSize: 16
                }}
                noItemsText="Nenhum item foi encontrado"
              />
            </Wrapper>
          </Modal>
        )}
        <ItemPreview>
          {area?.map((area, index) => {
            return <ItemText key={index}>{area}</ItemText>
          })}
        </ItemPreview>
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
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
              </Picker>
            </PickerButton>
          </HalfItem>
        </HalfItemArea>
        <InputItem>
          <InputTitle>Escolha os Sintomas</InputTitle>
          <ModalButton onPress={openModalSymptom}>
            <ModalButtonText>Selecionar sintomas</ModalButtonText>
          </ModalButton>
        </InputItem>
        {modalSymptomIsOpen && (
          <Modal
            isVisible={modalSymptomIsOpen}
            onBackdropPress={closeModalSymptom}
            onBackButtonPress={closeModalSymptom}
          >
            <Wrapper>
              <MultiSelect
                hideTags
                items={sintomasItems}
                uniqueKey="name"
                onSelectedItemsChange={setSintoma}
                selectedItems={sintoma}
                selectText="Selecione os sintomas"
                searchInputPlaceholderText="Pesquise os sintomas..."
                hideSubmitButton
                hideDropdown
                styleDropdownMenuSubsection={{
                  alignItems: 'center',
                  height: 70,
                  paddingLeft: 20
                }}
                selectedItemTextColor={secondary}
                selectedItemIconColor={secondary}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{
                  color: '#000',
                  height: 70,
                  fontSize: 16
                }}
                noItemsText="Nenhum item foi encontrado"
              />
            </Wrapper>
          </Modal>
        )}
        <ItemPreview>
          {sintoma?.map((sintoma, index) => {
            return <ItemText key={index}>{sintoma}</ItemText>
          })}
        </ItemPreview>
        <InputItem>
          <InputTitle>Escolha as comorbidades</InputTitle>
          <ModalButton onPress={openModalComorbidity}>
            <ModalButtonText>Selecionar comorbidades</ModalButtonText>
          </ModalButton>
        </InputItem>
        {modalComorbidityIsOpen && (
          <Modal
            isVisible={modalComorbidityIsOpen}
            onBackdropPress={closeModalComorbidity}
            onBackButtonPress={closeModalComorbidity}
          >
            <Wrapper>
              <MultiSelect
                hideTags
                items={comorbidadesItems}
                uniqueKey="name"
                onSelectedItemsChange={setComorbidades}
                selectedItems={comorbidades}
                selectText="Selecione as comorbidades"
                searchInputPlaceholderText="Pesquise as comorbidades..."
                hideSubmitButton
                hideDropdown
                styleDropdownMenuSubsection={{
                  alignItems: 'center',
                  height: 70,
                  paddingLeft: 20
                }}
                selectedItemTextColor={secondary}
                selectedItemIconColor={secondary}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{
                  color: '#000',
                  height: 70,
                  fontSize: 16
                }}
                noItemsText="Nenhum item foi encontrado"
              />
            </Wrapper>
          </Modal>
        )}
        <ItemPreview>
          {comorbidades?.map((comorbidades, index) => {
            return <ItemText key={index}>{comorbidades}</ItemText>
          })}
        </ItemPreview>
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
                items={medicamentosItems}
                uniqueKey="name"
                onSelectedItemsChange={setMedicamentos}
                selectedItems={medicamentos}
                selectText="Selecione os medicamentos"
                searchInputPlaceholderText="Pesquise os medicamentos..."
                hideSubmitButton
                hideDropdown
                styleDropdownMenuSubsection={{
                  alignItems: 'center',
                  height: 70,
                  paddingLeft: 20
                }}
                selectedItemTextColor={secondary}
                selectedItemIconColor={secondary}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{
                  color: '#000',
                  height: 70,
                  fontSize: 16
                }}
                noItemsText="Nenhum item foi encontrado"
              />
            </Wrapper>
          </Modal>
        )}
        <ItemPreview>
          {medicamentos?.map((med, index) => {
            return <ItemText key={index}>{med}</ItemText>
          })}
        </ItemPreview>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Prosseguir</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}
