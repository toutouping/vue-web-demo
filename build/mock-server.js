var path = require('path')
var express = require('express')
var devIp = require('dev-ip'); //用来获取本机ip地址
var mock = require('express-mockjs')
var request = require('supertest');

var app = express();
var host = devIp();

console.warn = function () {};

describe('express mockjs test:', function () {
  describe('Basic testing.', function () {
    // 使用默认路径 '/'（不推荐）
    // app.use(mock(path.join(__dirname, 'mocks')))
    
    // 自定义路径 '/api'
    app.use('/api', mock(path.join(process.cwd(), 'mocks')))

    // 以下为接口测试
    // it('example /example-data', function (done) {
    //   request(app)
    //     .get('/api/example-data')
    //     .expect('Content-Type', /json/)
    //     .expect(200, /^{"code":\d,"data":\{"list":\[\{"title"/, done);
    // });
  });
});

// 这里可以添加你的自定义代码.
app.listen(8082, function () {
    console.log('listening at http://'+host+':'+ 8082);
});