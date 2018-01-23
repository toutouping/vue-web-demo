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

var appData = require('./data.json');
var apiRoutes = express.Router();

app.post('/getMenuList', function(req, res) {
  res.json({
    code: 0,
    message: 'success',
    data: appData.menuList
  });
});
app.post('/getSchoolList', function(req, res) {
  res.json({
    code: 0,
    message: 'success',
    data: appData.schoolList
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
