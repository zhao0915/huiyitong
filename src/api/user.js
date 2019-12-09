import { tebiemiao } from '../request/index'
export default {
  getToken: data => tebiemiao.post(`/token`, data)
}