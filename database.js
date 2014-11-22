var mongoose = require("mongoose");

exports.dbHandler = function(logger,DBname) {
    //Members
    this.logger = logger;
    this.dbName = DBname;
    
    //Member Functions

    //Connect To Database
    this.connect = function () {
        mongoose.connect('mongodb://localhost/'+dbName,function(err,res){
	    if (err){
		logger.error("Error Connecting to %s Database: %s", dbName,err);
		return false;
	    } else {
		logger.info("Succesfully connected to %s Database.",dbName);
		return true;
	    }
	})
    };
}
