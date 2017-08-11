var app = require('./express.js');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
		secret: 'my secret code',
		resave: true,
		saveUninitialized: true
	}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(app.express.static(__dirname + '/public'));

// require('./server/app.js');

var port = process.env.PORT || 3000;
app.listen(port)