var Event = require('events').EventEmitter;

var emt = new Event();

emt.on('userRegistration', function () {
	var userRegTime = new Date();
	var message = 'зарегистрировался в ' + userRegTime;
	console.log(message);
}) 

emt.emit('userRegistration');

