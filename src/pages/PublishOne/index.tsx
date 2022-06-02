import { Picker } from '@react-native-picker/picker'
import { useIsFocused } from '@react-navigation/core'
import I18n from 'i18n-js'
import React, { useCallback, useLayoutEffect, useState } from 'react'
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
  const { modalChoosePlanIsOpen, openModalChoosePlan, closeModalChoosePlan } =
    useModal()

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

  I18n.translations = {
    pt: {
      title: 'Publicar caso clínico',
      inputTitleArea: 'Escolha a área',
      inputPlaceholderArea: 'Selecionar áreas',
      inputSearchArea: 'Pesquise as áreas...',
      firstOptionArea: 'Doença coronariana',
      secondOptionArea: 'Valvopatia',
      thirdOptionArea: 'Cardiopatias congênitas',
      fourthOptionArea: 'Arritmias',
      fifthOptionArea: 'Outros',
      inputTitleAge: 'Idade',
      inputPlaceholderAge: 'Digite aqui...',
      inputTitleGenre: 'Gênero',
      firstOptionGenre: 'Masculino',
      secondOptionGenre: 'Feminino',
      inputTitleSymptoms: 'Escolha os sintomas',
      inputPlaceholderSymptoms: 'Selecionar sintomas',
      inputSearchSymptoms: 'Pesquise os sintomas...',
      firstOptionSymptoms: 'Dor precordial',
      secondOptionSymptoms: 'Dispnéia',
      thirdOptionSymptoms: 'Palpitações',
      fourthOptionSymptoms: 'Síncope',
      fifthOptionSymptoms: 'Cianose',
      sixthOptionSymptoms: 'Outros',
      inputTitleComorbidities: 'Escolha as comorbidades',
      inputPlaceholderComorbidities: 'Selecionar comorbidades',
      inputSearchComorbidities: 'Pesquise as comorbidades...',
      firstOptionComorbidities: 'Hipertensão arterial sistêmica',
      secondOptionComorbidities: 'Diabetes melitus',
      thirdOptionComorbidities: 'Dislipedemia',
      forthOptionComorbidities: 'Obesidade',
      fifthOptionComorbidities: 'Sedentarismo',
      sixthOptionComorbidities: 'Tabagismo',
      seventhOptionComorbidities: 'Doença renal',
      eighthOptionComorbidities: 'Doença coronariana previamente conhecida',
      ninthOptionComorbidities: 'Histórico familiar para coronariopatia',
      tenthOptionComorbidities: 'Sem comorbidades',
      eleventhOptionComorbidities: 'Outros',
      inputTitleMedicines: 'Medicamentos em uso',
      inputPlaceholderMedicines: 'Selecionar medicamentos',
      inputSearchMedicines: 'Pesquise os medicamentos...',
      firstOptionMedicines: 'Medicamento 1',
      secondOptionMedicines: 'Medicamento 2',
      thirdOptionMedicines: 'Medicamento 3',
      button: 'Prosseguir',
      notFound: 'Nenhum item encontrado',
      error: 'Erro',
      fill: 'Preencha todos os campos'
    },
    en: {
      title: 'Publish clinical case',
      inputTitleArea: 'Choose the area',
      inputPlaceholderArea: 'Select areas',
      inputSearchArea: 'Search the areas...',
      firstOptionArea: 'Coronary disease',
      secondOptionArea: 'Valvulopathy',
      thirdOptionArea: 'Congenital heart diseases',
      fourthOptionArea: 'Arrhythmias',
      fifthOptionArea: 'Others',
      inputTitleAge: 'Age',
      inputPlaceholderAge: 'Type here...',
      inputTitleGenre: 'Genre',
      firstOptionGenre: 'Masculine',
      secondOptionGenre: 'Feminine',
      inputTitleSymptoms: 'Choose the symptoms',
      inputPlaceholderSymptoms: 'Select symptoms',
      inputSearchSymptoms: 'Search for symptoms...',
      firstOptionSymptoms: 'Chest pain',
      secondOptionSymptoms: 'Dyspnea',
      thirdOptionSymptoms: 'Palpitations',
      fourthOptionSymptoms: 'Syncope',
      fifthOptionSymptoms: 'Cyanosis',
      sixthOptionSymptoms: 'Others',
      inputTitleComorbidities: 'Choose comorbidities',
      inputPlaceholderComorbidities: 'Select comorbidities',
      inputSearchComorbidities: 'Search for comorbidities...',
      firstOptionComorbidities: 'Systemic arterial hypertension',
      secondOptionComorbidities: 'Diabetes Mellitus',
      thirdOptionComorbidities: 'Dyslipidemia',
      fourthOptionComorbidities: 'Obesity',
      fifthOptionComorbidities: 'Sedentary lifestyle',
      sixthOptionComorbidities: 'Smoking',
      seventhOptionComorbidities: 'Kidney disease',
      eighthOptionComorbidities: 'Previously known coronary heart disease',
      ninthOptionComorbidities: 'Family history of coronary artery disease',
      tenthOptionComorbidities: 'No comorbidities',
      eleventhOptionComorbidities: 'Others',
      inputTitleMedicines: 'Medications in use',
      inputPlaceholderMedicines: 'Select medications',
      inputSearchMedicines: 'Search for medicines...',
      firstOptionMedicines: 'Medication 1',
      secondOptionMedicines: 'Medication 2',
      thirdOptionMedicines: 'Medication 3',
      button: 'Proceed',
      notFound: 'No items found',
      error: 'Error',
      fill: 'Fill in all fields'
    },
    es: {
      title: 'Publicar caso clínico',
      inputTitleArea: 'Elige la zona',
      inputPlaceholderArea: 'Seleccionar áreas',
      inputSearchArea: 'Busca en las zonas..',
      firstOptionArea: 'Enfermedad coronaria',
      secondOptionArea: 'Valvulopatía',
      thirdOptionArea: 'Cardiopatías congénitas',
      fourthOptionArea: 'Arritmias',
      fifthOptionArea: 'Otros',
      inputTitleAge: 'Años',
      inputPlaceholderAge: 'Digite aquí...',
      inputTitleGenre: 'Género',
      firstOptionGenre: 'Masculino',
      secondOptionGenre: 'Femenino',
      inputTitleSymptoms: 'Elige los sintomas',
      inputPlaceholderSymptoms: 'Seleccionar síntomas',
      inputSearchSymptoms: 'Busca síntomas...',
      firstOptionSymptoms: 'Dolor de pecho',
      secondOptionSymptoms: 'Disnea',
      thirdOptionSymptoms: 'Palpitaciones',
      fourthOptionSymptoms: 'Síncope',
      fifthOptionSymptoms: 'Cianosis',
      sixthOptionSymptoms: 'Otros',
      inputTitleComorbidities: 'Elija comorbilidades',
      inputPlaceholderComorbidities: 'Seleccionar comorbilidades',
      inputSearchComorbidities: 'Busca comorbilidades...',
      firstOptionComorbidities: 'Hipertensión arterial sistémica',
      secondOptionComorbidities: 'Diabetes mellitus',
      thirdOptionComorbidities: 'Dislipidemia',
      fourthOptionComorbidities: 'Obesidad',
      fifthOptionComorbidities: 'Estilo de vida sedentario',
      sixthOptionComorbidities: 'De fumar',
      seventhOptionComorbidities: 'Enfermedad del riñon',
      eighthOptionComorbidities: 'Enfermedad coronaria conocida previamente',
      ninthOptionComorbidities:
        'Antecedentes familiares de enfermedad de las arterias coronarias',
      tenthOptionComorbidities: 'Sin comorbilidades',
      eleventhOptionComorbidities: 'Otros',
      inputTitleMedicines: 'Medicamentos en uso',
      inputPlaceholderMedicines: 'Seleccionar medicamentos',
      inputSearchMedicines: 'Buscar medicinas...',
      firstOptionMedicines: 'Medicamento 1',
      secondOptionMedicines: 'Medicamento 2',
      thirdOptionMedicines: 'Medicamento 3',
      button: 'Proceder',
      notFound: 'No se encontraron artículos',
      error: 'Error',
      fill: 'Rellene todos los campos'
    }
  }

  const [area, setArea] = useState<string[]>([])
  const [idade, setIdade] = useState('')
  const [genero, setGenero] = useState(I18n.t('firstOptionGenre'))
  const [sintoma, setSintoma] = useState<string[]>([])
  const [comorbidades, setComorbidades] = useState<string[]>([])
  const [medicamentos, setMedicamentos] = useState<string[]>([])

  const isFocused = useIsFocused()

  const areaItems = [
    {
      id: '1',
      name: I18n.t('firstOptionArea')
    },
    {
      id: '2',
      name: I18n.t('secondOptionArea')
    },
    {
      id: '3',
      name: I18n.t('thirdOptionArea')
    },
    {
      id: '4',
      name: I18n.t('fourthOptionArea')
    },
    {
      id: '5',
      name: I18n.t('fifthOptionArea')
    }
  ]

  const sintomasItems = [
    {
      id: '1',
      name: I18n.t('firstOptionSymptoms')
    },
    {
      id: '2',
      name: I18n.t('secondOptionSymptoms')
    },
    {
      id: '3',
      name: I18n.t('thirdOptionSymptoms')
    },
    {
      id: '4',
      name: I18n.t('fourthOptionSymptoms')
    },
    {
      id: '5',
      name: I18n.t('fifthOptionSymptoms')
    },
    {
      id: '6',
      name: I18n.t('sixthOptionSymptoms')
    }
  ]

  const comorbidadesItems = [
    {
      id: '1',
      name: I18n.t('firstOptionComorbidities')
    },
    {
      id: '2',
      name: I18n.t('secondOptionComorbidities')
    },
    {
      id: '3',
      name: I18n.t('thirdOptionComorbidities')
    },
    {
      id: '4',
      name: I18n.t('fourthOptionComorbidities')
    },
    {
      id: '5',
      name: I18n.t('fifthOptionComorbidities')
    },
    {
      id: '6',
      name: I18n.t('sixthOptionComorbidities')
    },
    {
      id: '7',
      name: I18n.t('seventhOptionComorbidities')
    },
    {
      id: '8',
      name: I18n.t('eighthOptionComorbidities')
    },
    {
      id: '9',
      name: I18n.t('ninthOptionComorbidities')
    },
    {
      id: '10',
      name: I18n.t('tenthOptionComorbidities')
    },
    {
      id: '11',
      name: I18n.t('eleventhOptionComorbidities')
    }
  ]

  const medicamentosItems = [
    {
      id: '1',
      name: I18n.t('firstOptionMedicines')
    },
    {
      id: '2',
      name: I18n.t('secondOptionMedicines')
    },
    {
      id: '3',
      name: I18n.t('thirdOptionMedicines')
    }
  ]

  const clear = () => {
    setArea([])
    setIdade('')
    setGenero(I18n.t('firstOptionGenre'))
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
      Alert.alert(I18n.t('warning'), I18n.t('fill'))
    }
  }

  useLayoutEffect(
    useCallback(() => {
      if (user?.isSubscriber === false) {
        openModalChoosePlan()
      }
      return () => closeModalChoosePlan()
    }, [user, isFocused])
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
        <Title>{I18n.t('title')}</Title>
        <Button></Button>
      </Header>
      <Wrapper>
        <InputItem>
          <InputTitle>{I18n.t('inputTitleArea')}</InputTitle>
          <ModalButton onPress={openModalArea}>
            <ModalButtonText>{I18n.t('inputPlaceholderArea')}</ModalButtonText>
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
                selectText={I18n.t('inputPlaceholderArea')}
                searchInputPlaceholderText={I18n.t('inputSearchArea')}
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
                noItemsText={I18n.t('notFound')}
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
            <InputTitle>{I18n.t('inputTitleAge')}</InputTitle>
            <Input
              keyboardType="number-pad"
              style={{ elevation: 10 }}
              placeholder={I18n.t('inputPlaceholderAge')}
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
                <Picker.Item
                  label={I18n.t('firstOptionGenre')}
                  value={I18n.t('firstOptionGenre')}
                />
                <Picker.Item
                  label={I18n.t('secondOptionGenre')}
                  value={I18n.t('secondOptionGenre')}
                />
              </Picker>
            </PickerButton>
          </HalfItem>
        </HalfItemArea>
        <InputItem>
          <InputTitle>{I18n.t('inputTitleSymptoms')}</InputTitle>
          <ModalButton onPress={openModalSymptom}>
            <ModalButtonText>{I18n.t('inputPlaceholderSymptoms')}</ModalButtonText>
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
                selectText={I18n.t('inputPlaceholderSymptoms')}
                searchInputPlaceholderText={I18n.t('inputSearchSymptoms')}
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
                noItemsText={I18n.t('notFound')}
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
          <InputTitle>{I18n.t('inputTitleComorbidities')}</InputTitle>
          <ModalButton onPress={openModalComorbidity}>
            <ModalButtonText>
              {I18n.t('inputPlaceholderComorbidities')}
            </ModalButtonText>
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
                selectText={I18n.t('inputPlaceholderComorbidities')}
                searchInputPlaceholderText={I18n.t('inputSearchComorbidities')}
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
                noItemsText={I18n.t('notFound')}
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
          <InputTitle>{I18n.t('inputTitleMedicines')}</InputTitle>
          <ModalButton onPress={openModalMedicine}>
            <ModalButtonText>{I18n.t('inputPlaceholderMedicines')}</ModalButtonText>
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
                selectText={I18n.t('inputPlaceholderMedicines')}
                searchInputPlaceholderText={I18n.t('inputSearchMedicines')}
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
                noItemsText={I18n.t('notFound')}
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
          <SubmitButtonText>{I18n.t('button')}</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}
