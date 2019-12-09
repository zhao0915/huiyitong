import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './Head.less'
class Head extends Component {
  render() {
    return (
      <View className='head'>Head</View>
    )
  }
}
export default Head