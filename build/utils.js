'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}
/*
 * 生成处理css的loaders配置
 * @method cssLoaders
 * @param {Object} options 生成的配置
  options = {
   sourceMap: true, // 是否开启 sourceMap
   extract: true // 是否提取css
 }
 @return {Object} 处理css的loaders的配置对象
*/
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: { // options是loader的选项配置
      sourceMap: options.sourceMap // 根据参数是否生成sourceMap文件 生成环境下压缩文件
    }
  }

  // generate loader string to be used with extract text plugin
   /* 
    生成ExtractTextPlugin对象或loader字符串
    @method generateLoaders
    @param {Array} loader 名称数组
    @return {String | Object} ExtractTextPlugin对象或loader字符串
   */
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader] // 默认是css-loader

    if (loader) { // 如果参数loader存在
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, { // 将loaderOptions和sourceMap组成一个对象
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 当extract为true时，提取css，生成环境中，默认为true
    if (options.extract) {
      return ExtractTextPlugin.extract({ // 如果传入的options存在extract且为true
        use: loaders, // 处理的loader
        fallback: 'vue-style-loader' // 没有被提取分离时使用的loader
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // 返回css类型对应的loader组成的对象 generateLoaders()来生成loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
/*
 生成style-loader的配置
 style-loader文档：https://github.com/webpack/style-loader
 @method styleLoaders
 @param {Object} options生成的配置
 @return {Array} style-loader的配置
*/
exports.styleLoaders = function (options) {
  const output = [] // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  const loaders = exports.cssLoaders(options) // 调用cssLoaders方法返回各类型的样式对象(css: loader)

  for (const extension in loaders) { // 循环遍历loaders
    const loader = loaders[extension] // 根据遍历获得的key(extension)来得到
    output.push({
      test: new RegExp('\\.' + extension + '$'), // 处理的文件类型
      use: loader // 用loader来处理，loader来自loaders[extension]
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
