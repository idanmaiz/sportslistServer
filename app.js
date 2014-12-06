/*********
  Exports
**********/

var config = require('./config');
var libs = require('./libs');

/***********************
  Logger Initialization
************************/

var logger = new (libs.winston.Logger)({
    transports: [
      new (libs.winston.transports.Console)({ level:logLevel, handleExceptions:true }),
      new (libs.winston.transports.File)({ filename: logPath , json:false, level:logLevel, handleExceptions:true})
    ]
});

logger.cli();
logger.info('Log level: %s',logLevel);

/********************************
 Database Handler Initialization
*********************************/

var dbHandler = new (libs.db.dbHandler)(logger,dbName);
dbHandler.connect();

/**********************
 Server Initialization
***********************/

var app = libs.express();

app.use(libs.express.static(__dirname + '/public'));

app.use(libs.bodyParser.json());

app.post('/addEvent',function(req,res){
	var callback = function(added){
		if (added)
			res.send('Event Added!');
		else
			res.send('Event not Added!');  
	};
//	console.log(req.body);
	dbHandler.addEvent(req.body,callback);
});

app.get('/',function(req,res){
	res.send('Hello World2!');
});

var server = libs.https.createServer({
    key: libs.fs.readFileSync('../ssl/server.key'),
    cert: libs.fs.readFileSync('../ssl/server.crt'),
    ca: libs.fs.readFileSync('../ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(serverPort, function() {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('Server started on http://%s:%d',host,port);
});


