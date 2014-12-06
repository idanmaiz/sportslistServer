var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/** Schemas **/
var EventSchema = new Schema({
  title:  String,
  creator: String
});

/** Models **/
var Event = mongoose.model('Event',EventSchema);


exports.dbHandler = function(logger,DBname) {

    /** Members **/
    this.logger = logger;
    this.DBname = DBname;

    /** Member Functions **/

    //Connect To Database
    this.connect = function () {
        mongoose.connect('mongodb://localhost/'+DBname,function(err,res){
	    if (err){
		logger.error("Error Connecting to %s Database: %s", DBname,err);
		return false;
	    } else {
		logger.info("Succesfully connected to %s Database.",DBname);
		return true;
	    }
	})
    };

    //Add new event to DB
    this.addEvent = function (eventDetails,cb) {
 	var event = new Event();
	event.title = eventDetails.title;
	event.creator = eventDetails.creator;
	event.save(function(err,doc){
		if (err){
		   logger.error("Error adding new event: %s",err);
		   cb(false);
		}
		else {
		   logger.info("New event added - Title: %s , Creator: %s",event.title,event.creator);
		   cb(true);
		}
	});
    };
}


