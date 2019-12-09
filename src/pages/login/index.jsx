import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getToken } from '../../actions/user'
import Head from '../../components/Head/Head'
import './index.less'
@connect(function (state) {
  return { ...state.user }
}, function (dispatch) {
  return {
    getTopicList(params) {
      dispatch(getToken(params))
    }
  }
})
class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  state = {
    phone: '',
    code: '',
    isClockShow: false,
    clock: 60
  }
  componentWillMount() {
    let {page, limit } = this.props
    this.props.getTopicList && this.props.getTopicList({page, limit, tab: 'all'})
    Taro.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  getCode(event) {
    event.stopPropagation()
    if (!this.checkPhoneInput()) {
      return false
    }
    this.setState({
      isClockShow: true
    }, () => {
      this.startClock()
    })
  }
  startClock() {
    this.setState({
      clock: 60
    }, () => {
      let { clock } = this.state
      const time = setInterval(() => {
        this.setState({
          clock: --clock
        })
        if (this.state.clock === 57) {
          clearInterval(time)
          this.setState({
            isClockShow: false
          })
        }
      }, 1000)
    })
    
  }
  checkPhoneInput() {
    const { phone } = this.state
    if (phone.length <= 0) {
      Taro.showToast({ title: '请填写手机号', icon: 'none' })
      return false
    }
    if (!this.isPhone(phone)) {
      Taro.showToast({ title: '请填写正确的手机号', icon: 'none' })
      return false
    }
    return true
  }
  isPhone(phone) {
    const reg = /^(\+86)|(86)?1[3,5,8,7]{1}[0-9]{1}[0-9]{8}$/
    return reg.test(phone)
  }
  phoneModify() {
    let { code } = this.state
    if (!/^\d{4}$/.test(code)) {
      Taro.showToast({ title: '验证码格式不对', icon: 'none' })
      return false
    }
    // if (!this.checkPhoneInput()) {
    //   return false
    // }
    Taro.reLaunch({
      url: '/pages/home/index'
    })
    // setTimeout(() => {
    //   Taro.reLaunch({
    //     url: '/pages/home/index'
    //   })
    // }, 500)
  }
  phoneChange(event) {
    this.setState({
      phone: event.target.value
    })
  }
  passwordChange(event) {
    event.stopPropagation()
    this.setState({
      code: event.target.value
    })
  }
  render() {
    let { isClockShow, clock } = this.state
    return (
      <View className='login'>
        <Head></Head>
        <View className='login_form'>
          <View className='input_contenner'>
            <Input focus className='login_inp' onInput={this.phoneChange.bind(this)} placeholder='手机号'></Input>
          </View>
          <View className='input_contenner'>
            <Input className='login_inp' onInput={this.passwordChange.bind(this)} placeholder='验证码'></Input>
            <View className='login_code'>
              {isClockShow ? <Text>{clock}</Text> : <Text onClick={this.getCode.bind(this)}>获取验证码</Text>}
            </View>
          </View>
          <Button onClick={this.phoneModify.bind(this)} className='login_btn'>登录</Button>
        </View>
      </View>
    )
  }
}
export default Login