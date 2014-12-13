/*********
  Exports
**********/


var config = require('./config/config');
var libs = require('./config/libs');

/***********************
  Logger Initialization
************************/

var logger = new (libs.winston.Logger)({
    transports: [
     // new (libs.winston.transports.Console)({ level:logLevel, handleExceptions:true }),
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

app.use(libs.express.static(publicFolder));

app.use(libs.bodyParser.json());

// Assign the routes for the app
require('./config/routes')(app,dbHandler);

var server;

if (useSSL)
{
	server = libs.https.createServer({
  	    key: libs.fs.readFileSync(SSL_Folder + '/server.key'),
	    cert: libs.fs.readFileSync(SSL_Folder + '/server.crt'),
   	    ca: libs.fs.readFileSync(SSL_Folder + '/ca.crt'),
  	    requestCert: true,
   	    rejectUnauthorized: false
	}, app).listen(serverPort, function() {
   	    var host = server.address().address;
            var port = server.address().port;
    	    logger.info('Server started on http://%s:%d with SSL',host,port);
	});
}
else
{
	server = app.listen(serverPort,function(){
	   var host = server.address().address;
	   var port = server.address().port;
	   logger.info('Server started on http://%s:%d',host,port);
	});
}




