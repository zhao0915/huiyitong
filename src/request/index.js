import Request from './Request'
const isDev = process.env.NODE_ENV === 'development'
const config = {
  appHost: isDev ? 'https://cnodejs.org/api/v1' : '',
  tebie: isDev ? 'https://h5.test.tebiemiao.cn' : ''
}
export const weapp = new Request({ baseURL: config.appHost })

export const tebiemiao = new Request({ baseURL: config.tebie + '/pay2' })