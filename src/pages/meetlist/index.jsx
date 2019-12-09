import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '../../api/index'
import Meet from './components/meet'
import './index.less'
@connect(function (state) {
  return { ...state.user }
})
class MeetList extends Component {
  state = {
    page: 1,
    limit: 10,
    tab: 'all',
    list: []
  }
  config = {
    navigationBarTitleText: '会议管理',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
    onReachBottomDistance: 20
  }
  componentWillMount() {
    Taro.hideHomeButton()
    let { page, limit, tab } = this.state
    this.fetchMeetList({ page, limit, tab })
  }
  async fetchMeetList(params) {
    
    let result = await api.meet.getTopics(params)
    if (result.success) {
      this.setState({
        list: result.data
      })
    } else {
      Taro.showToast({ title: '点赞失败!', icon: 'none' })
    }
    return false
  }
  // 下拉刷新
  async onPullDownRefresh() {
    await this.fetchMeetList()
    Taro.stopPullDownRefresh()
  }
  onReachBottom() {
    console.log('上拉')
  }
  render() {
    let { list } = this.state
    return (
      <View className='meet_list'>
        <View>
          {list.length > 0 && list.map((item, index) => {
            return (
              <Meet item={item} key={item}></Meet>
            )
          })}
        </View>
      </View>
    )
  }
}
export default MeetList