
function checkAnswer(){
    var answer = document.getElementById("ua").value;
    if(answer === "git init"){
	window.alert("You initiated your git repository! Good job!");
	return true;
    }
    return false;
}