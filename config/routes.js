/*******************
       Routes
*******************/
var mongoose = require("mongoose");
var models = require('./schemas');

var Event = models.Event;
var User = models.User;

module.exports = function(app,dbHandler){
	app.post('/addEvent',function(req,res){
        	var callback = function(added){
                	if (added)
                        	res.send('Event Added!');
                	else
                        	res.send('Event not Added!');
        	};
        	dbHandler.addEvent(req.body,callback);
	});

	app.get('/',function(req,res){
        	res.send('Hello World2!');
	});

	app.post('/authenticate', function(req, res) {
		var callback = function(err,user){
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				if (user) {
					res.json({
						type: true,
						data: user,
						token: user.token
					});
				} else {
					res.json({
						type: false,
						data: "Incorrect email/password"
					});
				}
			}
		};
		dbHandler.authenticate(req,callback);
	});

	app.post('/signin', function(req, res) {
		var callback = function(err,user){
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				if (user) {
					res.json({
						type: false,
						data: "User already exists!"
					});
				} else {
					var userModel = new User();
					userModel.email = req.body.email;
					userModel.password = req.body.password;
					userModel.save(function(err, user) {
						user.token = jwt.sign(user, process.env.JWT_SECRET);
						user.save(function(err, user1) {
							res.json({
								type: true,
								data: user1,
								token: user1.token
							});
						});
					})
				}
			}
		}
		dbHandler.signin(req,callback)
	});

	app.get('/me', ensureAuthorized, function(req, res) {
		User.findOne({token: req.token}, function(err, user) {
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				res.json({
					type: true,
					data: user
				});
			}
		});
	});

	function ensureAuthorized(req, res, next) {
		var bearerToken;
		var bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			req.token = bearerToken;
			next();
		} else {
			res.send(403);
		}
	}

};
