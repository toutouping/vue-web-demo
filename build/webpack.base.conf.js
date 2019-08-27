'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: { // 入口起点
    app: './src/main.js'
  },
  output: { // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
    path: config.build.assetsRoot,  // 导出目录的绝对路径 在项目的根目录下 会新建dist文件夹
    filename: '[name].js', // [name]代表了入口文件的名称 main
    // webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
    // publicPath 是虚拟目录，自动指向path编译的目录。
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  /* 设置模块如何被解析
   比如如下文件
   src
     components
       a.vue
     router
       home
         index.vue
    在index.vue里面，正常引用A组件；如下：
    import A from '../../components/a.vue';
    如果设置了 alias后，那么引用的地方可以如下这样了
    import A from 'src/components/a.vue';
    注意：这里的 @ 起到了 resolve('src')路径的作用了。
  */
  resolve: {
    extensions: ['.js', '.vue', '.json'],// 自动解析确定的扩展名，导入模块时不带扩展名
    alias: { // 设置别名
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'api': resolve('src/api'),
      'pages': resolve('src/pages'),
      'views': resolve('src/views'),
      'common': resolve('src/common'),
      'component': resolve('src/component')
    }
  },
  // 如果需要引入jquery 或者 其他非npm安装的文件，参照https://segmentfault.com/a/1190000007020623

  /* loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
  因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader
  可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader
  甚至允许你直接在 JavaScript 模块中 import CSS文件！*/
  //『一切皆模块』是 webpack 的核心思想，而能够将一切资源都打包成模块的，是 loader，
  // loader 能够将所有文件都转换为 JavaScript 语言的模块，不管这个文件是什么类型、什么语言。
  module: {
    rules: [
      // 在开发环境下 对于以.js或.vue后缀结尾的文件(在src目录下或test目录下的文件)，使用eslint进行文件语法检测
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      // test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件
      // loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理
      {
        test: /\.vue$/, // vue 文件后缀的
        loader: 'vue-loader', // 使用vue-loader处理
        options: vueLoaderConfig // options是对vue-loader做的额外选项配置 文件配置在 ./vue-loader.conf 内可以查看代码
      },
      {
        test: /\.js$/, // js文件后缀的
        loader: 'babel-loader', // 使用babel-loader处理
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')] // 包含src和test的文件夹
      },
      // 对低于 10000 字节的 xx文件使用 url-loader 加载器，而对等于或超过 10000 字节的 xx文件使用 file-loader 加载器https://zhuanlan.zhihu.com/p/26038486
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 处理图片后缀
        loader: 'url-loader', // 使用url-loader处理
        options: {
          limit: 10000, // 图片小于10000字节时以base64的方式引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 文件名为name.7位hash的值.扩展名
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 音频文件后缀
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10000字节时的时候处理
          name: utils.assetsPath('media/[name].[hash:7].[ext]') // 文件名为name.7位hash的值.扩展名
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体文件
        loader: 'url-loader',
        options: {
          limit: 10000, // 字体文件小于10000字节的时候处理
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]') // 文件名为name.7位hash的值.扩展名
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ]
}
