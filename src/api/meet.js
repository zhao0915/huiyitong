import { weapp } from '../request/index'
export default {
  getTopics: (data) => weapp.get('/topics', data)
}