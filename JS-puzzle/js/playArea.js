/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/
function PlayArea(parent,canvasId){
	var gameCanvas = document.createElement('CANVAS');
	this.lng = 480;
	this.brd = 480;
	this.canvasId = canvasId;
	this.gameState;
	this.gameDimension;

	//for direction purpose
	var directionEnum = Object.freeze({
		LEFT: 37, 
		RIGHT: 39, 
		UP: 38,
		DOWN:40
	});

	var that = this;

	var context = gameCanvas.getContext("2d");
	var img = new Image();
	img.src =   'images/elephant.png';
	img.addEventListener('load',that.displaySlides,false);	

	this.initialize = function(){
		gameCanvas.setAttribute('id',canvasId);
		gameCanvas.width = this.lng.toString();
		gameCanvas.height = this.brd.toString();
		gameCanvas.display = 'block';
		//console.log(gameCanvas);
		parent.appendChild(gameCanvas);
	}
	this.initGameState = function(gameDimension){
		that.gameDimension = gameDimension;
		that.gameState = new Matrix(that.gameDimension,that.gameDimension);
		that.gameState.initialize();
	}

	this.updateGameState = function(keyCode){
		switch(keyCode){
			case directionEnum.UP:
				that.gameState.moveUp();
				break;
			case directionEnum.DOWN:
				that.gameState.moveDown();
				break;
			case directionEnum.LEFT:
				that.gameState.moveLeft();
				break;
			case directionEnum.RIGHT:
				that.gameState.moveRight();
				break;
		}
	}

	//function to display the current tiles
	this.displaySlides = function(){
  		var clearence = 1;
  		context.clearRect ( 0 , 0 , that.lng , that.brd );
  		var tileSize = that.lng/that.gameDimension;
  		for (var i = 0; i < that.gameDimension; i++) {
  			for (var j = 0; j < that.gameDimension; j++) {
  				var CurrentNumber = that.gameState.Data[i][j];
  				if(CurrentNumber){
  					var ClipRow = (CurrentNumber - 1) % that.gameDimension;
	  				var ClipCol = Math.floor((CurrentNumber - 1) / that.gameDimension);
	  				var Clipx = ClipRow * tileSize;
	  				var Clipy = ClipCol * tileSize;
	  				context.drawImage(
	  				   img, Clipx,Clipy, tileSize, tileSize,
	                   j * tileSize, i * tileSize, tileSize-clearence, tileSize-clearence
	                );
  				}
  			}
  		}
	}
}