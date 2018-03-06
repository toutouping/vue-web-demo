'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'// 判断是否是生产环境
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({ // 处理 .vue文件中的样式
    sourceMap: sourceMapEnabled, // 是否打开 source-map
    extract: isProduction // 是否提取样式到单独的文件
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: { // 为 .vue 添加如下转换属性选项
    video: ['src', 'poster'], // 让 vue-loader 知道需要对 video 的 src 和 poster 属性的内容转换为模块
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
