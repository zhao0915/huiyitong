import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Map } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
class MapNav extends Component {
  state = {
    longitude: null,
    latitude: null
  }
  onTap() {

  }
  componentWillMount() {
    const this_ = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        this_.setState({
          latitude: latitude,
          longitude: longitude
        }, () => {
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          })
        })
        // console.log(latitude, longitude)
      }
    })
  }
  render() {
    let { longitude, latitude } = this.state
    return (
      <View></View>
      // <Map style="width: 100%; height: 580px;"
      //   longitude={longitude}
      //   latitude={latitude}
      //   scale='17'
      //   onClick={this.onTap.bind(this)} />
    )
  }
}
export default MapNav