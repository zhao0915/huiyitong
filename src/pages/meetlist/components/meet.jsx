import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
class Meet extends Component {
  render() {
    let { item } = this.props
    return (
      <View className='meet'>
        <View className='meet_contenner'>
          <Image className='meet_image' src={item.author.avatar_url}></Image>
          <View className='meet_right'>
            <View>{item.title}</View>
          </View>
        </View>
      </View>
    )
  }
}
export default Meet