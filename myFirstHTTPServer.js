var express = require('express');

var server = express();
server.use(express.static(__dirname + '/.'));

server.post('/command', function (req, res) {
	git_command = req.query.cmd;	
	if(git_command === "git init"){
	    res.status(200).send("your post request was great");
	}else{
	    res.status(400).send("your post request was not great, try again");
	    console.log(git_command);
	}	
    });

const PORT=8080;
server.listen(PORT, function() {
    console.log('server listening on port ' + PORT);
});










