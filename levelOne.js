var level_complete = false;

function checkAnswer(){
    var answer = document.getElementById("ua").value;
    if(answer === "git init"){
	window.alert("You initiated your git repository! Good job! Now you can go to the next level.");
	level_complete = true;
	return true;
    }
    return false;
}

function checkLevelComplete(){
    if(level_complete){	
	window.location = "levelTwo.html";
    }
}