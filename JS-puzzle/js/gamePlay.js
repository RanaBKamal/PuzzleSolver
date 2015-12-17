/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/

function GamePlay(gameDivId){
	this.gameWindow = new GameWindow(gameDivId);
	this.gameWindow.initialize();
	var scaleId = this.gameWindow.scaleId;
	var scaleBox = document.getElementById(scaleId);
	console.log(scaleBox.value);
	
}