import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
class Banner extends Component {
  render() {
    return (
      <View>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          duration={500}
          circular
          interval={5000}
          indicatorDots
          autoplay={true}>
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
export default Banner