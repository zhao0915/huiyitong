import Taro from '@tarojs/taro'

export default class Request {
  constructor(config) {
    this.config = config
  }
  async req(url, data, method) {
    let token = this.token
    let shelfId = this.shelfId

    if (!token) {
      this.token = token = Taro.getStorageSync('token') || ''
    }
    if (!shelfId) {
      this.shelfId = shelfId = Taro.getStorageSync('qrCodeId') || ''
    }

    try {
      const res = await Taro.request({
        url: this.config.baseURL + url,
        data,
        header: {
          'Content-Type': 'application/json',
          'X-Token': token,
          'X-Shelf-ID': shelfId
        },
        method
      })

      if (res.statusCode === 200 || res.statusCode === 0) {
        if (!this.config.noConsole) {
          console.log(`${new Date().toLocaleString()}【 M=${url} 】【接口响应：】`, res.data)
        }
        return res.data
      } else if (res.statusCode === 401 || res.statusCode === 403) {
        Taro.reLaunch({
          url: '/pages/guidePage/index'
        })
      } else if (res.statusCode === 500) {
        Taro.showToast('服务器繁忙，请稍后再试')
      } else {
        const msg = res.data.message
        throw msg ? `${msg}~` : res.data.code
      }
    } catch (e) {
      console.log('错误', e)
      const msg = typeof e === 'string' ? e : (e.data.message || e.errorMessage)
      console.log('msg', msg)
      Taro.showToast(msg)
      throw e
    }
  }
  get(url, data) {
    return this.req(url, data, 'GET')
  }
  post(url, data) {
    return this.req(url, data, 'POST')
  }
  del(url, data) {
    return this.req(url, data, 'DELETE')
  }
  put(url, data) {
    return this.req(url, data, 'PUT')
  }
}
