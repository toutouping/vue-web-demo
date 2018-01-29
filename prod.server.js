var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

var syssetting = require('./data/data.json');
var usercenter = require('./data/usercenter.json');
var apiRoutes = express.Router();


app.post('/syssetting/getMenuList', function(req, res) {
  res.json({
    code: 0,
    message: 'success',
    data: syssetting.menuList
  });
});
app.post('/syssetting/getSchoolList', function(req, res) {
  res.json({
    code: 0,
    message: 'success',
    data: syssetting.schoolList
  });
});
app.post('/usercenter/getMenuList', function(req, res) {
  res.json({
    code: 0,
    message: 'success',
    data: usercenter.menuList
  });
});
app.post('/usercenter/getSchoolList', function(req, res) {
  res.json({
    code: 0,
    message: 'success',
    data: usercenter.schoolList
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});
