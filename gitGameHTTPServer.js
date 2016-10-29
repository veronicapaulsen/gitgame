var express = require('express');

var server = express();
server.use(express.static(__dirname + '/.'));
var correct_command_count = 0;

server.post('/command', function (req, res) {
	git_command = req.query.cmd;	
	level = req.query.lvl;
	var command_to_execute = "";

	if(git_command === "git init" && level === "1"){
	    command_to_execute = 'mkdir ~/Desktop/myGitGameRepo && git init ~/Desktop/myGitGameRepo';
	}else if(git_command === "git add Plum" && level === "2"){
	    command_to_execute = 'cd ~/Desktop/myGitGameRepo && touch Plum && git add Plum';
	}else if(git_command === "git commit -m \"I reached my first checkpoint\"" && level === "3"){
	    command_to_execute = 'cd ~/Desktop/myGitGameRepo && git commit -m "I reached my first checkpoint"';
	}else if(level === "4"){
	    key = req.query.key;
	    if(correct_command_count == 0 && key === "true" && git_command === "git status"){
		correct_command_count++;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && touch key && git status';
	    }else if(correct_command_count == 1 && git_command === "git add key"){
                correct_command_count++;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git add key';
            }else if(correct_command_count == 2 && git_command === "git commit -m \"Level four checkpoint\""){
                correct_command_count++;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git commit -m "Level four checkpoint"';
            }
	}


	if(command_to_execute !== ""){
	    //do shell command
	    const exec = require('child_process').exec;
	    exec(command_to_execute, (error, stdout, stderr) => {
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










