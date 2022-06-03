declare namespace App {
  export interface Notification {
    id?: string
    title: string
    message: string
    dataCriacao: firebase.firestore.FieldValue
    dataExibicao: string
  }
}
