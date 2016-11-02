var express = require('express');

var server = express();
server.use(express.static(__dirname + '/.'));
var correct_command_count = 0;

server.post('/command', function (req, res) {
	git_command = req.query.cmd;	
	level = req.query.lvl;
	var command_to_execute = "";

	if(git_command.toUpperCase() === "git init".toUpperCase() && level === "1"){
	    command_to_execute = 'mkdir ~/Desktop/myGitGameRepo && git init ~/Desktop/myGitGameRepo';
	}else if(git_command.toUpperCase() === "git add Plum".toUpperCase() && level === "2"){
	    command_to_execute = 'cd ~/Desktop/myGitGameRepo && touch Plum && git add Plum';
	}else if(git_command.toUpperCase() === "git commit -m \"Level three checkpoint\"".toUpperCase() && level === "3"){
	    command_to_execute = 'cd ~/Desktop/myGitGameRepo && git commit -m "I reached my first checkpoint"';
	}else if(level === "4"){
	    key = req.query.key;
	    if(correct_command_count == 0 && key === "true" && git_command.toUpperCase() === "git status".toUpperCase()){
		correct_command_count++;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && touch key && git status';
	    }else if(correct_command_count == 1 && git_command.toUpperCase() === "git add key".toUpperCase()){
                correct_command_count++;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git add key';
            }else if(correct_command_count == 2 && git_command.toUpperCase() === "git commit -m \"Level four checkpoint\"".toUpperCase()){
                correct_command_count=0;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git commit -m "Level four checkpoint"';
            }
	}else if(level === "5"){
	    if(git_command.toUpperCase() === "git checkout -b red".toUpperCase()){
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git checkout -b red';
	    }else if (git_command.toUpperCase() === "git checkout -b blue".toUpperCase()){
                command_to_execute = 'cd ~/Desktop/myGitGameRepo && git checkout -b blue';
            }else if(git_command.toUpperCase() === "git status".toUpperCase()){
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git status';
	    }
	}else if(level === "5.5"){
	    if(git_command.toUpperCase() === "git checkout master".toUpperCase()){
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git checkout master';
	    }
	}else if(level === "6"){
	    if(git_command.toUpperCase() === "git checkout -b red".toUpperCase()){
                command_to_execute = 'cd ~/Desktop/myGitGameRepo && git checkout -b red';
            }else if (git_command.toUpperCase() === "git checkout -b blue".toUpperCase()){
                command_to_execute = 'cd ~/Desktop/myGitGameRepo && git checkout -b blue';
            }else if(git_command.toUpperCase() === "git status".toUpperCase()){
                command_to_execute = 'cd ~/Desktop/myGitGameRepo && git status';
            }
	}else if(level === "7"){
	    if(correct_command_count == 0 && git_command.toUpperCase() === "git commit -m \"Level seven checkpoint\"".toUpperCase()){
		correct_command_count++;
		command_to_execute = 'cd ~/Desktop/myGitGameRepo && git commit -m "Level seven checkpoint" --allow-empty';		
	    }else if(correct_command_count == 1 && git_command.toUpperCase() === "git checkout master".toUpperCase()){
		correct_command_count++;
		command_to_execute = "cd ~/Desktop/myGitGameRepo && git checkout master";	    
	    }else if(correct_command_count == 2 && git_command.toUpperCase() === "git merge red".toUpperCase()){
		correct_command_count=0;
		command_to_execute = "cd ~/Desktop/myGitGameRepo && git merge red";
	    }else if(correct_command_count == 2 && git_command.toUpperCase() === "git merge blue".toUpperCase()){
                correct_command_count=0;
                command_to_execute = "cd ~/Desktop/myGitGameRepo && git merge blue";
            }
	}


	if(command_to_execute !== ""){
	    //do shell command
	    const exec = require('child_process').exec;
	    exec(command_to_execute, (error, stdout, stderr) => {
		    if (error) {
			console.log(`exec error: ${error}`);
			res.status(400).send(stderr);
			console.log(`stderr: ${stderr}`);
			return;
		    }
		    console.log(`stdout: ${stdout}`);		    
		    res.status(200).send(stdout);
		});
	}else{
	    console.error(`exec error: Empty input received`);
	    res.status(400).send("You didn't enter the right command! Try again");
	}
    });

const PORT=8080;
server.listen(PORT, function() {
    console.log('server listening on port ' + PORT);
});










