var http = require('http'),
	fs = require('fs');

//1
/*
var server = http.createServer(function(req, res) {
	if (req.url === '/stream') {
		var stream = fs.createReadStream('demo.txt');
		stream.pipe(res);
	} else if (req.url ==='/file') {
		fs.readFile('demo.txt', function (err, html) {
   			if (err) {
        		throw err; 
    		}
	    	res.writeHead(200, {"Content-Type": "text/html"});  
	    	res.write(html);  
	    	res.end();  
    	});
	} else {
	    res.write('Hello World');  
	    res.end();  
	}
}).listen(3000, function() {
		console.log('Go to localhost:3000');
});
*/

//2 усложненное

var server = http.createServer(function(req, res) {
	if (getFilesizeInBytes('demo.txt') > 1000) {
		var stream = fs.createReadStream('demo.txt');
		stream.pipe(res);
		console.log('streaming');
	} else if (getFilesizeInBytes('demo.txt') < 1000) {
		fs.readFile('demo.txt', function (err, html) {
   			if (err) {
        		throw err; 
    		}
	    	res.writeHead(200, {"Content-Type": "text/html"});  
	    	res.write(html);  
	    	res.end();
	    	console.log('reading');  
    	});
	} else {
	    res.write('smth went wrong');  
	    res.end();  
	}
}).listen(3000, function() {
		console.log('Go to localhost:3000');
});

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes
}