Crafty.init(1250,350, document.getElementById('game'));

var checkpoint = false;
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
		checkpoint = true;
	    }
	    else if(player.hit('Key')){
		Crafty.log("you hit the key");
		key = true;
	    }
	})	
    .bind("HitOff", function(comp){
            checkpoint = false;
            Crafty.log("you are off the checkpoint");
        })	
    .twoway(200);
Crafty.e('Wall_Left, 2D, Canvas, Color, Collision').attr({x: 0, y: 150, w: 10, h: 100}).color('Black');
Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({x: 0, y: 250, w: 1250, h: 10}).color('Black');
Crafty.e('CheckPoint, 2D, Canvas, Color, Collision, Floor').attr({x: 1000, y: 150, w: 100, h: 10}).color('Gold');
Crafty.e('Invisible_CheckPoint, 2D, Canvas, Color, Collision').attr({x: 1000, y: 149, w: 100, h: 1}).color('White');
//var key = Crafty.e("2D, DOM, Image").image("key.png");
var key = Crafty.e('Key, 2D, Canvas, Color, Collision').attr({x: 800, y: 230, w: 50, h: 20}).color('Silver');

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    if(key && answer === "git status"){
	window.alert("untracked files: key. This means the key you just picked up was not added to your repository, you could lose it! Add the key to your repository the same way you added Plum.");
    }
    else if(key && answer === "git add key"){
	window.alert("You added the key to your repository! Great job! now get Plum to the checkpoint and commit. Your message should be \"Level four checkpoint\"");
    }
    else if(checkpoint == true && answer === "git commit -m \"Level four checkpoint.\""){
        window.alert("You completed level four, yay!");
        return true;
    }
    return false;
}