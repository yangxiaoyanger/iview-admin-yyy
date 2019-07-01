const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // proxy: 'https://water.randee.cn/'
    port: '8081', // 代理端口
    open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/api': {// 代理api
        // target: 'http://10.0.30.163:19090', // 服务器api地址
        target: 'https://water.randee.cn/', // 服务器api地址
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        pathRewrite: {// 重写路径
          '^/api': '/api'
        }
      }
      // '/basicinfo': {// 代理api
      //   target: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/', // 服务器api地址
      //   changeOrigin: true, // 是否跨域
      //   ws: true, // proxy websockets
      //   pathRewrite: {// 重写路径
      //     // '^/basicinfo': ''
      //   }
      // }
    }
  }
}
