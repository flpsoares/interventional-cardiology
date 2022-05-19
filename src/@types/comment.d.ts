declare namespace App {
  export interface Comment {
    id: string
    autorId: string
    autorNome: string
    autorFoto?: string
    texto: string
    dataCriacao: firebase.firestore.FieldValue
    dataExibicao: string
  }
}
