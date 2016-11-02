Crafty.init(1250,350, document.getElementById('game'));

var level_complete = false;
var at_checkpoint = false;
var key = false;

var player = Crafty.e('2D, DOM, Color, Twoway, Gravity, Collision')
    .attr({x: 11, y: 0, w: 50, h: 50})
    .color('DarkOrchid')
    .gravity('Floor')
    .onHit("Wall_Left", function() {
            Crafty.log("You hit the wall");
            this.x = this.x+4;
        })
    .checkHits('Invisible_CheckPoint, Key')
    .bind("HitOn", function(hitData){
	    Crafty.log("you hit an object");
	    if(player.hit('Invisible_CheckPoint')){
		Crafty.log("you are at the checkpoint");
		at_checkpoint = true;
	    }
	    else if(player.hit('Key')){
		Crafty.log("you hit the key");
		key = true;
		keyEntity.color('White');
	    }
	})	
    .bind("HitOff", function(comp){
	    if(comp == 'Invisible_CheckPoint'){
		at_checkpoint = false;
		Crafty.log("you are off the checkpoint");
	    }
        })	
    .twoway(200);
Crafty.e('Wall_Left, 2D, Canvas, Color, Collision').attr({x: 0, y: 150, w: 10, h: 100}).color('Black');
Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({x: 0, y: 250, w: 1250, h: 10}).color('Black');
Crafty.e('CheckPoint, 2D, Canvas, Color, Collision, Floor').attr({x: 1000, y: 150, w: 100, h: 10}).color('Gold');
Crafty.e('Invisible_CheckPoint, 2D, Canvas, Color, Collision').attr({x: 1000, y: 149, w: 100, h: 1}).color('White');
//var key = Crafty.e("2D, DOM, Image").image("key.png");
var keyEntity = Crafty.e('Key, 2D, Canvas, Color, Collision').attr({x: 800, y: 230, w: 50, h: 20}).color('Silver');

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    httpPostAsync(answer);
}

var added_key = false;
var command_count = 0;

function httpPostAsync(answer_){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        var message = xmlHttp.response;

	if(xmlHttp.readyState == 4 && xmlHttp.status == 200 && command_count == 0){
	    window.alert(message + "\n Great job! Now you should checkout the master branch so that you can merge this branch to the master. \n type git checkout master");
	    command_count++;
	}
	else if(xmlHttp.readyState == 4 && xmlHttp.status == 200 && command_count == 1){
	    window.alert(message + "Now that you are on the master branch. You should merge the branches. \n type git merge [insert branch name] \n your branch name should be either red or blue");
	    command_count++;
	}
	else if(xmlHttp.readyState == 4 && xmlHttp.status == 200 && command_count == 2){
	    window.alert("You completed level seven, yay!");
	    level_complete = true;
	}else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
	    level_complete = false;
	    window.alert(message);
	}
    }
    encoded_answer = encodeURIComponent(answer_);
    theUrl = "http://localhost:8080/command?cmd="+encoded_answer+"&lvl=7";
    xmlHttp.open( "POST", theUrl, true );
    xmlHttp.send(answer_);

}

function checkLevelComplete(){
    if(level_complete && at_checkpoint){
	window.location = "levelSeven.html";
    }
}