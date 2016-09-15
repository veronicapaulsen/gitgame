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
    .checkHits('Invisible_CheckPoint')
    .bind("HitOn", function(hitData){
	    Crafty.log("you are at the checkpoint");
    	    at_checkpoint = true;
	})
    .bind("HitOff", function(comp){
	    at_checkpoint = false;
	    Crafty.log("you are off the checkpoint");
	})
    .twoway(200);
Crafty.e('Wall_Left, 2D, Canvas, Color, Collision').attr({x: 0, y: 150, w: 10, h: 100}).color('Black');
Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({x: 0, y: 250, w: 1250, h: 10}).color('Black');
Crafty.e('CheckPoint, 2D, Canvas, Color, Collision, Floor').attr({x: 1000, y: 150, w: 100, h: 10}).color('Gold');
Crafty.e('Invisible_CheckPoint, 2D, Canvas, Color, Collision').attr({x: 1000, y: 149, w: 100, h: 1}).color('White');

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    if(at_checkpoint && answer === "git commit -m \"I reached my first checkpoint.\""){
        window.alert("You made your first commit! Good job! This means your place here will always be stored, so if you get lost you can always come back to this checkpoint.");
	level_complete = true;
    }
}

function checkLevelComplete(){
    if(level_complete && at_checkpoint){	
	window.location = "levelFour.html";
    }
}
