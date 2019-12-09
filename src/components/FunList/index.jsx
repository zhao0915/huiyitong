import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
class FunList extends Component {
  itemClick(item) {
    switch (item.name) {
      case '签到':
        this.goScan()
        break
      case '导航':
        this.goMap()
        break
      case '人员':
        this.goPerson()
        break
      case '酒店':
        this.goHotel()
        break
      default:
        break
    }
    
  }
  goMap() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          address: '开会酒店地址'
        })
      }
    })
  }
  goPerson() {
    Taro.navigateTo({
      url: '/pages/person/index'
    })
  }
  goHotel() {
    Taro.navigateTo({
      url: '/pages/hotel/index'
    })
  }
  goScan() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  }
  render() {
    let menuList = [
      { name: '文件', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' },
      { name: '日程', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' },
      { name: '人员', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' },
      { name: '导航', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' },
      { name: '酒店', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' },
      { name: '座位', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' },
      { name: '签到', icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2139083763,1025083438&fm=26&gp=0.jpg' }
    ]
    return (
      <View className='funlist clearfix'>
        {
          menuList.map((item) => {
            return (
              <View className='menu_item clearfix' key={item.name}>
                <Image onClick={this.itemClick.bind(this, item)} className='menu_image' src={item.icon}></Image>
                <Text className='menu_text'>{item.name}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
export default FunList