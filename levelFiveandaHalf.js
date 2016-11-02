Crafty.init(1250,350, document.getElementById('game'));

var level_complete = false;
var at_checkpoint = false;

var player = Crafty.e('2D, DOM, Color, Twoway, Gravity, Collision')
    .attr({x: 11, y: 0, w: 50, h: 50})
    .color('DarkOrchid')
    .gravity('Floor')
    .onHit("Wall_Left", function() {
            Crafty.log("You hit the wall");
            this.x = this.x+4;
        })
    .onHit("Wall_Right", function() {
            Crafty.log("You hit the wall");
            this.x = this.x-4;
        })
    .twoway(200);
Crafty.e('Wall_Left, 2D, Canvas, Color, Collision').attr({x: 0, y: 150, w: 10, h: 100}).color('Black');
Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({x: 0, y: 250, w: 800, h: 10}).color('Black');
Crafty.e('Wall_Right, 2D, Canvas, Color, Collision').attr({x: 800, y: 0, w: 10, h: 260}).color('Black');

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    httpPostAsync(answer);
}


function httpPostAsync(answer_){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        var message = xmlHttp.response;

	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
	    window.alert(message + "\n Now click next level, you will be sent back to where the master branch left off.");	 
	    level_complete = true;
	}else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
	    level_complete = false;
	    window.alert(message);
	}
    }
    encoded_answer = encodeURIComponent(answer_);
    theUrl = "http://localhost:8080/command?cmd="+encoded_answer+"&lvl=5.5";
    xmlHttp.open( "POST", theUrl, true );
    xmlHttp.send(answer_);

}

function checkLevelComplete(){
    if(level_complete){
	window.location = "levelSix.html";
    }
}