import axios from 'axios'
import { api } from './api'

class MercadoPagoApi {
  public async createPreference(month: number) {
    return api.post('/preferences', { month: month }).then((res) => res)
  }

  public async saleInfo(id: string) {
    return axios
      .get(`https://api.mercadopago.com/v1/payments/${id}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
  }
}

export default new MercadoPagoApi()
