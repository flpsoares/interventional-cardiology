import React, { useState } from 'react'
import {
  Button,
  Container,
  HalfItem,
  HalfItemArea,
  Header,
  Input,
  InputItem,
  InputTitle,
  PickerButton,
  SubmitButton,
  SubmitButtonText,
  Title,
  UserPhoto,
  Wrapper
} from './style'

import { Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useNavigate } from '../../contexts/NavigateContext'
import { Alert } from 'react-native'

export const PublishOne: React.FC = () => {
  const { navigateToPublish } = useNavigate()

  const [area, setArea] = useState('Doença coronariana')
  const [idade, setIdade] = useState('')
  const [genero, setGenero] = useState('Masculino')
  const [sintomas, setSintomas] = useState('Dor precordial')
  const [comorbidades, setComorbidades] = useState('Hipertensão arterial sistêmica')
  const [medicamentos, setMedicamentos] = useState('')

  const clear = () => {
    setArea('Doença coronariana')
    setIdade('')
    setGenero('Masculino')
    setComorbidades('Hipertensão arterial sistêmica')
    setMedicamentos('')
  }

  const handleSubmit = () => {
    // if (area !== '' && idade !== '' && genero !== '' && comorbidades !== '') {
    //   clear()
    //   navigateToPublish()
    // } else {
    //   Alert.alert('Aviso', 'Preencha todos os campos')
    // }
    navigateToPublish()
  }

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      <Header>
        <UserPhoto source={require('../../../assets/default-user.png')} />
        <Title>Publicar caso clínico</Title>
        <Button>{/* <Fontisto name="close-a" size={18} /> */}</Button>
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
              selectedValue={sintomas}
              onValueChange={(value) => setSintomas(value)}
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
          <Input
            style={{ elevation: 10 }}
            placeholder="Digite aqui..."
            value={medicamentos}
            onChangeText={(value) => setMedicamentos(value)}
          />
        </InputItem>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Prosseguir</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}
