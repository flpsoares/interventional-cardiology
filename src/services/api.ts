import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://interventional-cardiology-back.herokuapp.com'
  // baseURL: 'http://10.0.2.2:3333'
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.defaults.headers.common.Authorization =
  'Bearer TEST-3378983497827104-031613-a1a71a63c3ea0e07288c28b35f32dfe4-480254124'
