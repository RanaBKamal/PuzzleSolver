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

	var autoSolveId = that.gameWindow.autoSolveId;
	var autoSolveB = document.getElementById(autoSolveId);
	
	playB.onclick = function(){		
		currentPlayArea.initGameState(scaleBox.value);
		currentPlayArea.displaySlides();
		scoreB.innerHTML = 'Steps:' + currentPlayArea.gameState.stepsMoved;
		if (currentPlayArea.gameState.row > 3) {
			var randMoves = [ ];
			for (var i = 0; i < 60; i++) {
				randMoves.push(37 + Math.floor(Math.random() * 4));
			}
			for (var index in randMoves) {		
				currentPlayArea.gameState.move(randMoves[index]);
			}
		}else{
			currentPlayArea.gameState.randomize();	
		}
		setTimeout(currentPlayArea.displaySlides,500);
		var play = new Play(currentPlayArea,scoreB,autoSolveB);
	}
}