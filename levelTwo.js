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
    httpPostAsync(answer);
}

function httpPostAsync(answer_){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        var message = xmlHttp.response;
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            level_complete = true;
            window.alert("You added Plum to your git repository! Good job! Now you can go to the next Level");
        }else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
            level_complete = false;
            window.alert(message);
        }
    }
    encoded_answer = encodeURIComponent(answer_);
    theUrl = "http://localhost:8080/command?cmd="+encoded_answer+"&lvl=2";
    xmlHttp.open( "POST", theUrl, true );
    xmlHttp.send(answer_);
}

function checkLevelComplete(){
    if(level_complete){	
	window.location = "levelThree.html";
    }
}