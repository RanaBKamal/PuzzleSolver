/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015
	Updated: Dec 20,2015 
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

	//taking Ids of the frameWindow elements
	var scaleId = that.gameWindow.scaleId;
	var scaleBox = document.getElementById(scaleId);

	var palyBId = that.gameWindow.playBId;
	var playB = document.getElementById(palyBId);

	var scoreBId = that.gameWindow.scoreBId;
	var scoreB = document.getElementById(scoreBId);

	playB.onclick = function(){		
		currentPlayArea.initGameState(scaleBox.value);
		currentPlayArea.displaySlides();
		scoreB.innerHTML = 'Steps:' + currentPlayArea.gameState.stepsMoved;
		currentPlayArea.gameState.randomizeTiles();
		setTimeout(currentPlayArea.displaySlides,1500);
		var play = new Play(currentPlayArea,scoreB);
	}
}