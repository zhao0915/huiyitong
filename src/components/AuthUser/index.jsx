import Taro, { Component } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { mergeInfo } from '../../actions/user'
import Model from '../Model'
import { connect } from '@tarojs/redux'
import store from '../../store'
import '../../utils.less'
import './index.less'

@connect(function (state) {
  return { userInfo: state.user }
}, function (dispatch) {
  return {
    updateUserInfo(params) {
      dispatch(mergeInfo(params))
    }
  }
})
export default class AuthUser extends Component{
  constructor(props) {
    super(props)
    this.state = {
      showPhone: false
    }
  }
  async onGetUserInfo(e) {
    console.log(store.dispatch)
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.props.updateUserInfo && this.props.updateUserInfo(userInfo)
      this.props.onSuccess && this.props.onSuccess()
    } else {
      console.log('取消授权')
    }
  }
  // 授权中
  render() {
    return (
      <Model title='授权提示' content='会议通需要获取你的公开信息（昵称、头像、地区及性别）' noCancel={true} backgroundColor='rgba(0, 0, 0, 0.7)' >
        <Button open-type='getUserInfo' onGetUserInfo={this.onGetUserInfo} plain>授权</Button>
      </Model>
    )
  }
}
