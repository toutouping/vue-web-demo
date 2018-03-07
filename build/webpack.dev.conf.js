'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config') // 配置文件
const merge = require('webpack-merge')// webpack-merge是一个可以合并数组和对象的插件
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const portfinder = require('portfinder')

// const syssetting = require('../data/data.json')
// const usercenter = require('../data/usercenter.json')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: { // 引入style的loader
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }) // 通过传入一些配置来获取rules配置，此处传入了sourceMap: false,表示不生成sourceMap
  },
  // 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map更快，但它的定位不准确 所以，换成 eval-source-map
  devtool: config.dev.devtool,

  //以下devServer 的选项可以通过config中进行自定义配置
  devServer: { // 配置行为选项
    // before(app) { // 提供在服务器内部所有其他中间件之前执行自定义中间件的能力。这可以用于定义自定义处理程序
    //   app.post('/api/syssetting/getMenuList', function(req, res) {
    //     res.json({
    //       code: 0,
    //       message: 'success',
    //       data: syssetting.menuList
    //     });
    //   });
    //   app.post('/api/syssetting/getSchoolList', function(req, res) {
    //     res.json({
    //       code: 0,
    //       message: 'success',
    //       data: syssetting.schoolList
    //     });
    //   });
    //   app.post('/api/usercenter/getMenuList', function(req, res) {
    //     res.json({
    //       code: 0,
    //       message: 'success',
    //       data: usercenter.menuList
    //     });
    //   });
    //   app.post('/api/usercenter/getSchoolList', function(req, res) {
    //     res.json({
    //       code: 0,
    //       message: 'success',
    //       data: usercenter.schoolList
    //     });
    //   });
    // },
    clientLogLevel: 'warning', // 设置消息显示的级别
    historyApiFallback: {
      rewrites: [ // 如果找不到对应的页面时,跳转到对应的页面
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, // 是否启用模块热替换属性
    contentBase: false, // 禁用 contentBase // since we use CopyWebpackPlugin.
    compress: true, // 服务都启用gzip 压缩
    host: HOST || config.dev.host, // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定"0.0.0.0"
    port: PORT || config.dev.port, // 指定要监听请求的端口号
    open: config.dev.autoOpenBrowser, // 是否自动打开浏览器
    overlay: config.dev.errorOverlay // 当设置为true时在浏览器当中全屏显示编译错误和警告。如果设置为false，则只显示编译错误的信息
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, // 此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable, // 配置代理
    quiet: true,// 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。 // necessary for FriendlyErrorsPlugin 
    watchOptions: { // 与监视文件相关的控制选项
      poll: config.dev.poll,
    }
  },
  plugins: [ // webpack 插件列表
    new webpack.DefinePlugin({ // 通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识
      'process.env': require('../config/dev.env') // 当前环境为开发环境
    }),
    new webpack.HotModuleReplacementPlugin(), //// 开启webpack热更新功能，模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。 HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([ // 把from内容全部拷贝到编译目录
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => { // 在配置文件项中返回Promise了，这就允许你在配置中可以进行一些异步的写法
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // 友好的错误提示 Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
