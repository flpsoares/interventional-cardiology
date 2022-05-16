declare namespace App {
  export interface Post {
    autorId: string
    autorNome: string
    autorFoto?: string
    id?: string
    area: string
    idade: string
    genero: string
    sintoma: string
    comorbidades: string
    medicamentos: string
    descricao: string
    medias: string[]
    dataCriacao: firebase.firestore.FieldValue
  }
}
