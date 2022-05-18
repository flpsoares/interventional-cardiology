export type RootStackParamsList = {
  Initial: undefined
  ChooseAuth: undefined
  Login: undefined
  Register: undefined
  Home: undefined
  PostDetails: { postId: string }
  Account: undefined
  EditAccount: undefined
  Plans: undefined
  PublishTwo: {
    area: string[]
    genero: string
    idade: string
    sintoma: string[]
    comorbidades: string[]
    medicamentos: string[]
  }
}
