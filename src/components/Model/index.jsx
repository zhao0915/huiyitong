import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import '../../utils.less'
import './index.less'

export default class Model extends Component {
  static deaultProps = {
    noCancel: false
  }
  onTouchMove(e) {
    e.stopPropagation()
    e.preventDefault()
  }
  render() {
    const { title, content, onCancel, noCancel, backgroundColor } = this.props
    return (
      <View
        className='Model df-c' style={{
          backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.5)'
        }}
        onTouchMove={this.onTouchMove}
      >
        <View className='box'>
          <View className='title'>{title}</View>
          <View className='content'>{content}</View>
          <View className='btns df-c'>
            {!noCancel && <View className='btn cancel' onClick={onCancel}>取消</View>}
            <View className='btn success'>
              {this.props.children}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
