/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/
function PlayArea(parent,canvasId){
	var gameCanvas = document.createElement('CANVAS');
	this.lng = 480;
	this.brd = 480;
	this.gameDimension = 6;
	this.canvasId = canvasId;
	gameCanvas.setAttribute('id',canvasId);
	gameCanvas.width = this.lng.toString();
	gameCanvas.height = this.brd.toString();
	gameCanvas.display = 'block';
	//console.log(gameCanvas);
	parent.appendChild(gameCanvas);
	this.gameState = new Matrix(this.gameDimension,this.gameDimension);
	this.gameState.initialize();
	var that = this;

	var context = gameCanvas.getContext("2d");
	var img = new Image();
	img.src =   'images/elephant.png';
	img.addEventListener('load',that.displaySlides,false);

	this.displaySlides = function(){
  		var clearence = 1;
  		//console.log(context);
  		context.clearRect ( 0 , 0 , that.lng , that.brd );
  		var tileSize = that.lng/that.gameDimension;
  		for (var i = 0; i < that.gameDimension; i++) {
  			for (var j = 0; j < that.gameDimension; j++) {
  				var CurrentNumber = this.gameState.Data[i][j];
  				if(CurrentNumber){
	  				var ClipRow = Math.floor((CurrentNumber - 1) / that.gameDimension);
	  				var ClipCol = (CurrentNumber - 1) % that.gameDimension;
	  				var Clipx = ClipRow * tileSize;
	  				var Clipy = ClipCol * tileSize;
	  				//console.log(CurrentNumber+' '+Clipx+' '+Clipy+ ' '+ClipRow+ ' '+ClipCol);
	  				context.drawImage(
	  				   img, Clipx,Clipy, tileSize, tileSize,
	                   i * tileSize, j * tileSize, tileSize-clearence, tileSize-clearence
	                );
	                console.log('display function invoked:');
	                //console.log("clipping at:",Clipx,Clipy);
          			//console.log("drawing tile: at",i*tileSize,j * tileSize);
  				}
  			}
  		}
	}
	that.displaySlides();
}