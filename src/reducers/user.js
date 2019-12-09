import { MERGE_INFO, CLEAR_INFO } from '../constants/user'
const USER_STATE = {
  isUserAuth: true,
  name: '',
  avatar: '',
  userId: '',
  phone: ''
}
export default function user(prestate=USER_STATE, action) {
  switch (action.type) {
    case MERGE_INFO:
      return { ...prestate, ...action.obj}
    case CLEAR_INFO:
      return { ...prestate, name: '', avatar: '', userId: '', phone: '' }
    default:
      return { ...prestate }
  }
}