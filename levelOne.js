var level_complete = false;

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
	    //window.alert("You initiated your git repository! Good job! Now you can go to the next level.");
	    window.alert(message + "\n this message means you initiated your git repository! Good job! Now you can go to the next level. ");
	}else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
            level_complete = false;
            window.alert(message);
	}
    }
    encoded_answer = encodeURIComponent(answer_);
    theUrl = "http://localhost:8080/command?cmd="+encoded_answer+"&lvl=1";
    xmlHttp.open( "POST", theUrl, true );
    xmlHttp.send(answer_);
}

function checkLevelComplete(){
    if(level_complete){	
	window.location = "levelTwo.html";
    }
}