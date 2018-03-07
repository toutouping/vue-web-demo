'use strict'
const path = require('path')// node自带的文件路径工具
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config') // 配置文件
const merge = require('webpack-merge')// webpack 配置合并插件
const baseWebpackConfig = require('./webpack.base.conf')// webpack 基本配置
const CopyWebpackPlugin = require('copy-webpack-plugin')// webpack 复制文件和文件夹的插件
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')// 提取css的插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')// webpack 优化压缩和优化 css 的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 如果当前环境为测试环境，则使用测试环境，否则，使用生产环境
const env = process.env.NODE_ENV === 'testing' // node判断当前环境是dev还是product（通过 set process.env.NODE_ENV = testing 设置）
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ // 调用了exports.cssLoaders(options),用来返回针对各类型的样式文件的处理方式
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  // 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map更快，但它的定位不准确 所以，换成 eval-source-map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,// 是否开启 sourceMap
  output: { // 出口
    // 编译输出的静态资源根路径 创建目标文件夹
    path: config.build.assetsRoot,
    // 编译输出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名 或可以理解为 非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识
    // 配置全局环境为生产环境
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 使用 UglifyJS 去压缩你的JavaScript代码
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: { // 压缩配置
          warnings: false // 不显示警告
        }
      },
      sourceMap: config.build.productionSourceMap, // 生成sourceMap文件
      parallel: true
    }),
    // extract css into its own file
    // 将js中引入的css分离的插件
    // 如果不使用ExtractTextPlugin 那么在组件中引用的scss会打包到模块的js文件中 
    //如果使用了ExtractTextPlugin allChunks: true的时候，则会把所有同步+异步的js中的样式抽取出来 打包成一个大的css文件。
    new ExtractTextPlugin({ 
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件 引入css文件和js文件
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' // filename表示生成html文件的名字
        ? 'index.html'
        : config.build.index,
      template: 'index.html', // 当webpack自动生成html文件的时候，会基于某个模板来进行。当然你也可以自定义自己的模板
      inject: true, // inject主要是设置将js和css文件插入在html的哪个位置，由于js的加载时同步进行的，所以它的位置对网页的加载速度是有影响的。inject共有四个可选项：true、body、head和false
      minify: { // minify的作用是对生成的html文件进行压缩，其值是一个object或者false。默认是false，表示不对html文件进行压缩。如果赋值为object，用于对压缩方式进行配置
        removeComments: true,  // 删除html中的注释代码
        collapseWhitespace: true, // 删除html中的空白符
        removeAttributeQuotes: true // 删除html元素中属性的引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' // 这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}','dependency' 不用说，按照不同文件的依赖关系来排序
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),// 根据代码内容生成普通模块的id,确保源码不变，moduleID不变
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(), // 提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度
    // split vendor js into its own file
    // 分割公共 js 到独立的文件vendor中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 文件名
      minChunks (module) { // 在一个模块被提取到公共chunk之前，它必须被最少minChunks个chunk所包含。（通俗的说就是一个模块至少要被minChunks个模块所引用，才能被提取到公共模块。）
        // any required modules inside node_modules are extracted to vendor
        // node_modules中的任何所需模块都提取到vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    /* 上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。
     原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。
     当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然
     会导致vendor变化。vendor变化会导致其hash值变化。*/
    // 下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // chunk的名称，如果这个chunk已经在entry中定义，该chunk会被直接提取；如果没有定义，则生成一个空的chunk来提取其他所有chunk的公共代码。
      // filename：可以指定提取出的公共代码的文件名称，可以使用output配置项中文件名的占位符。未定义时使用name作为文件名。
      // chunks：可以指定要提取公共模块的源chunks，指定的chunk必须是公共chunk的子模块，如果没有指定则使用所有entry中定义的入口chunk。
      minChunks: Infinity // 如果指定了Infinity，则创建一个公共chunk，但是不包含任何模块，内部是一些webpack生成的runtime代码和chunk自身包含的模块（如果chunk存在的话）
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

     // 复制静态资源,将static文件内的内容复制到指定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {// 判断是否启用Gzip

  // 引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 目标文件名
      algorithm: 'gzip', // 使用gzip压缩
      test: new RegExp( // 满足正则表达式的文件会被压缩
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) { // 可以查看项目一共打了多少包，每个包的体积，每个包里面的包情况
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
