var express = require('express');

var server = express();
server.use(express.static(__dirname + '/.'));

server.post('/command', function (req, res) {
	git_command = req.query.cmd;	
	if(git_command === "git init"){
	    //do shell command
	    const exec = require('child_process').exec;
	    exec('mkdir ~/Desktop/myGitGameRepo && git init ~/Desktop/myGitGameRepo', (error, stdout, stderr) => {
		    if (error) {
			console.error(`exec error: ${error}`);
			res.status(400).send(stderr);
			console.log(`stderr: ${stderr}`);
			return;
		    }
		    console.log(`stdout: ${stdout}`);		    
		    res.status(200).send(stdout);
		});
	}else{
	    res.status(400).send("You didn't enter the right command! Try again");
	}
    });

const PORT=8080;
server.listen(PORT, function() {
    console.log('server listening on port ' + PORT);
});










