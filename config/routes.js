/*******************
       Routes
*******************/

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
}
