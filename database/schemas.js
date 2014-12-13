/******************************************
  This file has all the Schemas and Models
******************************************/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/** Schemas **/
var EventSchema = new Schema({
  title:  String,
  creator: String
});

var UserSchema = new Schema({
  email:String,
  password:String,
  token:String
})




/** Models **/
exports.Event = mongoose.model('Event',EventSchema);
exports.User = mongoose.model('User',UserSchema);


