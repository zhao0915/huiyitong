import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classnames from 'classnames'
let cityData = require('./utils/city.js')
import './index.less'
class Person extends Component {
  config = {
    navigationBarTitleText: '查看人员'
  }
  state = {
    config: {
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      hidden: true,
      letter: 'A' //
    },
    city: [],
    rightArr: []
  }
  componentWillMount() {
    this.resetRight()
  }
  resetRight() {
    let storeCity = new Array(26)
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y", "Z"
    ]
    words.forEach((item, index) => {
      storeCity[index] = {
        title: item,
        list: []
      }
    })
    cityData.cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        title: firstName
      })
    })
    this.setState({
      city: storeCity,
      rightArr: words
    }, () => {
      if (cityData.cities.length !== 0) {
        this.queryMultipleNodes()
      }
    })
  }
  // 侧边栏点击事件里start，外start，里end，外end
  // 外start
  handlerTouchstart() {}
  // 外end
  handlerTouchEnd() {
    // let {config} = this.state
    // this.setState({
    //   config: {
    //     ...config,
    //     hidden: true
    //   }
    // })
  }
  // 里start
  jumpMtstart(e) {
    console.log(e.currentTarget.dataset.letter)
    let letter = e.currentTarget.dataset.letter
    this.setState({
      config: {
        hidden: true,
        letter: letter,
        search: true,
        searchHeight: 45
      }
    }, () => {
      console.log(this.state)
    })
  }
  // 里end
  jumpMtEnd(e) {}
	/**
	 * 列表点击事件
	 */
  detailMt(e) {
    console.log(e.currentTarget.dataset.detail)
  }
  queryMultipleNodes() {
    let self = this
    const query = Taro.createSelectorQuery()
    query.selectAll('.fixed-title-hock').boundingClientRect((res) => {
      res.forEach(function (rect) {
        rect.top
      })
    }).exec()
  }
  render() {
    let {config, city, rightArr} = this.state
    return (
      <View style='height:100vh'>
        <View class='list-warpper'>
          <View class="list-search" style={{'height': config.searchHeight + 'px'}}>
            <View class='list-search-box'>
              搜索栏
			      </View>
          </View>

          <ScrollView class={classnames(['list-scroll', {'top': config.search}])} 
            style={{'padding-top': config.search ? config.searchHeight + 'px' : 0 + 'px'}}
            scrollY scrollIntoView={config.letter}
            scrollWithAnimation>
            {city.map((item) => {
              return (
                <View id={item.title} key={item}>
                  <View class='list-title fixed-title-hock'>{item.title}</View>
                  <View>
                    {item.list.map((cityItem, idx) => {
                      return (
                        <View class='list-name border' item={cityItem} index={idx} key={cityItem}
                          data-detail={cityItem} onClick={this.detailMt.bind(this)}>
                          {cityItem.name}
                        </View>
                      )
                    })}
                  </View>
                </View>
              )
            })}
			    </ScrollView>
          <View class='list-right-wrapper'
            onClick={this.handlerTouchEnd.bind(this)}>
            {
              rightArr.map((rItem, rIndex) => {
                return (
                  <View class='right-item' key={rItem} data-letter={rItem}
                    onClick={this.jumpMtstart.bind(this)}>
                    {rItem}
                  </View>
                )
              })
            }
          </View>
        </View>
        <View hidden={false} className="index-tooltip">{ config.letter }</View>
      </View>
    )
  }
}
export default Person