/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015 
	Updated Date: Dec  16, 2015
************************************/
function PlayArea(parent,canvasId){
	this.gameCanvas;
	this.widthCanvas = 480;
	this.heightCanvas = 480;
	this.canvasId = canvasId;
	this.gameState;
	this.gameDimension;

	//for image and the context
	this.context;
	this.img;

	var that = this;

	//for direction purpose
	var directionEnum = Object.freeze({
		LEFT: 37, 
		RIGHT: 39, 
		UP: 38,
		DOWN:40
	});

	//function to initialize the canvas element of the play area
	this.initialize = function(){
		var gameCanvas = document.createElement('CANVAS');
		that.gameCanvas = gameCanvas;

		that.gameCanvas.setAttribute('id',canvasId);
		that.gameCanvas.width = this.widthCanvas.toString();
		that.gameCanvas.height = this.heightCanvas.toString();
		that.gameCanvas.display = 'block';
		//console.log(gameCanvas);
		parent.appendChild(that.gameCanvas);
		that.initContext();
	}


	//function to initialize the context and image source
	this.initContext = function(){		//init the image source
		that.context = that.gameCanvas.getContext("2d");
		that.img = new Image();
		that.img.src =   'images/elephant.png';
		that.img.addEventListener('load',that.displaySlides,false);	
	}

	//function to init the game state
	this.initGameState = function(gameDimension){
		that.gameDimension = gameDimension;
		that.gameState = new Matrix(that.gameDimension,that.gameDimension);
		that.gameState.initialize();
		//that.gameState.randomizeTiles();
	}

	//function to update the game state
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
  		that.context.clearRect ( 0 , 0 , that.widthCanvas , that.heightCanvas );
  		var tileSize = that.widthCanvas/that.gameDimension;
  		for (var i = 0; i < that.gameDimension; i++) {
  			for (var j = 0; j < that.gameDimension; j++) {
  				var CurrentNumber = that.gameState.Data[i][j];
  				if(CurrentNumber){
  					var ClipRow = (CurrentNumber - 1) % that.gameDimension;
	  				var ClipCol = Math.floor((CurrentNumber - 1) / that.gameDimension);
	  				var Clipx = ClipRow * tileSize;
	  				var Clipy = ClipCol * tileSize;
	  				that.context.drawImage(
	  				   that.img, Clipx,Clipy, tileSize, tileSize,
	                   j * tileSize, i * tileSize, tileSize-clearence, tileSize-clearence
	                );
  				}
  			}
  		}
	}
}