Crafty.init(1250,350, document.getElementById('game'));

var level_complete = false;

Crafty.e('2D, DOM, Color, Twoway, Gravity, Collision')
    .attr({x: 11, y: 0, w: 50, h: 50})
    .color('DarkOrchid')
    .gravity('Floor')
    .checkHits('Solid')
    .bind("HitOn", function(hitData){
	    Crafty.log("You hit the wall");
	})
    .bind("HitOff", function(hitData){
	    Crafty.log("You stopped hitting the wall");
	})
    .onHit("Wall_Left", function() {
	    Crafty.log("You hit the wall");
	    this.x = this.x+4;
	})
    .twoway(200);
Crafty.e('Wall_Left, 2D, Canvas, Color, Collision').attr({x: 0, y: 150, w: 10, h: 100}).color('Black');
Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({x: 0, y: 250, w: 1250, h: 10}).color('Black');   

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    if(answer === "git add Plum"){
        window.alert("You added Plum to your git repository! Good job!");
	level_complete = true;
    }
}

function checkLevelComplete(){
    if(level_complete){	
	window.location = "levelThree.html";
    }
}