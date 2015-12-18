/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/

function GamePlay(gameDivId){
	this.gameDivId = gameDivId;
	//create the environment for game
	this.gameWindow = new GameWindow(this.gameDivId);
	this.gameWindow.initialize();
	var that = this;

	//initialize the canvas play area
	var currentPlayArea = new PlayArea(
		document.getElementById(that.gameWindow.sliderWrpId),
		that.gameWindow.canvasId);
		currentPlayArea.initialize();

	//event that reads the change of the input value
	//and starts the game
	var scaleId = that.gameWindow.scaleId;
	var scaleBox = document.getElementById(scaleId);


	//to detect the level input by the user then start to play
	scaleBox.onchange = function() {	
		currentPlayArea.initGameState(scaleBox.value);
		currentPlayArea.displaySlides();
		var play = new Play(currentPlayArea);
	}	
}