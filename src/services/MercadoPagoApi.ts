import axios from 'axios'
import { api } from './api'

class MercadoPagoApi {
  public async createPreference(month: number, userId: string) {
    return api
      .post('/preferences', { month: month, userId })
      .then((res) => res)
      .catch((e) => console.log(e.response))
  }

  public async saleInfo(id: string) {
    return axios
      .get(`https://api.mercadopago.com/v1/payments/${id}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
  }
}

export default new MercadoPagoApi()
