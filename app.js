/*********
  Exports
**********/

var libs = require('./libs');
var config = require('./config');

/***********************
  Logger Initialization
***********************/

var logger = new (libs.winston.Logger)({
    transports: [
      new (libs.winston.transports.Console)({ level:logLevel }),
      new (libs.winston.transports.File)({ filename: logPath , json:false, level:logLevel})
    ]
});

logger.cli();
logger.info('Log level: %s',logLevel);

/**********************
 Server Initialization
***********************/

libs.http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n'); }).listen(serverPort, "127.0.0.1");

logger.info('Server started on http://127.0.0.1:%d',serverPort); 
