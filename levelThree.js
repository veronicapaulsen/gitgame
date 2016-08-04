Crafty.init(1250,350, document.getElementById('game'));

var checkpoint = false;

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
    	    checkpoint = true;
	})
    .bind("HitOff", function(comp){
	    checkpoint = false;
	    Crafty.log("you are off the checkpoint");
	})
    .twoway(200);
Crafty.e('Wall_Left, 2D, Canvas, Color, Collision').attr({x: 0, y: 150, w: 10, h: 100}).color('DarkGrey');
Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({x: 0, y: 250, w: 1250, h: 10}).color('DarkGrey');
Crafty.e('CheckPoint, 2D, Canvas, Color, Collision, Floor').attr({x: 1000, y: 150, w: 100, h: 10}).color('Gold');
Crafty.e('Invisible_CheckPoint, 2D, Canvas, Color, Collision').attr({x: 1000, y: 149, w: 100, h: 1}).color('White');

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    if(checkpoint == true && answer === "git commit -m \"I reached my first checkpoint.\""){
        window.alert("You added Plum to your git repository! Good job!");
        return true;
    }
    return false;
}
