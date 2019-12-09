import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
class Hotel extends Component {
  componentWillMount() {
    Taro.hideHomeButton()
  }
  render() {
    return (
      <View>Hotel</View>
    )
  }
}
export default Hotel