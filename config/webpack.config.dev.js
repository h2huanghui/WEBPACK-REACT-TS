const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool: 'inline-source-map',
  // devServer: {
  //   // disableHostCheck: true,
  //   // contentBase: '../dist',
  //   // // host: 'test.crov.com',
  //   // // host: '127.0.0.1',
  //   // // useLocalIp: true,
  //   // port: '2020',
  //   // historyApiFallback: true,
  //   hot: true,
  //   open: true,
  //   proxy: {
  //     '/api/': {
  //       target: 'http://localhost:4000',
  //       pathRewrite: { '/api': '' }, // 后台在转接的时候url中是没有 /api 的
  //       changeOrigin: true // 加了这个属性，那后端收到的请求头中的host是目标地址 target
  //     }
  //   }
  // }
  devServer: {
    hot: true, // 它是热更新：只更新改变的组件或者模块，不会整体刷新页面
    open: true, // 是否自动打开浏览器
    // 直接自己造数据，不访问后端接口
    before: function (app) {
      // 接口 /api/user
      app.get('/api/employee/getEmployee.action', function (req, res) {
        // 请求成功返回数据
        res.json({
          flag: 0,
          data: [
            {
              id: 1,
              key: 1,
              name: '小明',
              department: '技术部',
              hiredate: '2019-07-01',
              level: '1级'
            },
            {
              id: 2,
              key: 2,
              name: '小莉',
              department: '产品部',
              hiredate: '2017-07-01',
              level: '2级'
            }
          ],
          msg: 'Error'
        });
      });

      // 接口 core
      app.get('/api/core', function (req, res) {
        // 请求成功返回数据
        res.json({ name: '这是第二个接口' });
      });
    }
  }
});
