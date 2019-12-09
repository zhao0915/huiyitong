import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import store from './store'
import 'taro-ui/dist/style/index.scss'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = configStore()

class App extends Component {

  config = {
    pages: [
      // 'pages/login/index',
      'pages/home/index',
      'pages/meetlist/index',
      'pages/person/index',
      'pages/login/index',
      'pages/hotel/index',
      'pages/map/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: false,
      color: '#999',
      selectedColor: '#4a4a4a',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '当前会议'
          // iconPath: './asset/images/home.png',
          // selectedIconPath: './asset/images/home_hover.png'
        },
        {
          pagePath: 'pages/meetlist/index',
          text: '全部会议'
          // iconPath: './asset/images/order.png',
          // selectedIconPath: './asset/images/order_hover.png'
        }
      ]
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
