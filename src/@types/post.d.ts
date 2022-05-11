declare namespace App {
  export interface Post {
    autorId: string
    autorNome: string
    id?: string
    area: string
    idade: string
    genero: string
    sintoma: string
    comorbidades: string
    medicamentos: string
    descricao: string
    dataCriacao: firebase.firestore.FieldValue
    favoritos?: string[]
  }
}
