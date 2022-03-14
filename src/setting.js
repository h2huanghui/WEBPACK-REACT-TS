const isDev = process.env.NODE_ENV === 'development'

export default {
  baseURL: isDev ? 'http://mock.ued.vemic.com/p/5f62db6585b23b23bda3c877/' : '/logistics/api/v1',
  // baseURL: '/logistics/api/v1',
  timeout: 60000
}
