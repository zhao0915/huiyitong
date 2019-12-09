import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AuthUser } from '../../components/AuthUser'
import openAuth from '../../utils/auth'
import Banner from '../../components/Banner/Banner'
import FunList from '../../components/FunList/index'
import './index.less'
@connect(function (state) {
  return { userInfo: state.user}
})
class Home extends Component {
  config = {
    navigationBarTitleText: '当前会议'
  }
  componentWillMount() {
    // Taro.login({
    //   success(res) {
    //     if (res.code) {
    //       console.log(res.code)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }
  goMeetingList() {
    Taro.navigateTo({
      url: '/pages/meetlist/index'
    })
  }
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
  onSuccessAuthUser() {
    console.log('拿到头像姓名信息')
    openAuth()
  }
  render() {
    let { userInfo } = this.props
    console.log(userInfo)
    return (
      <View className='home clearfix'>
        {!userInfo.isUserAuth ? <AuthUser onSuccess={this.onSuccessAuthUser} userInfo={userInfo} /> : null}
        <Banner></Banner>
        <FunList></FunList>
        <Button open-type="getPhoneNumber" onBindgetphonenumber={this.getPhoneNumber.bind(this)}>获取手机号</Button>
      </View>
    )
  }
}
export default Home