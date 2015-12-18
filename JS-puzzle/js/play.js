/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 19, 2015 
************************************/

function Play(playArea) {
	this.playArea = playArea;
	var directionEnum = Object.freeze({
		LEFT: 37, 
		RIGHT: 39, 
		UP: 38,
		DOWN:40
	});

	var that = this;

	//keyDown event handling
	document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case directionEnum.LEFT:
	            that.playArea.updateGameState(directionEnum.LEFT);
	            that.playArea.displaySlides();
	            break;
	        case directionEnum.UP:
	            that.playArea.updateGameState(directionEnum.UP);
	            that.playArea.displaySlides();
	            break;
	        case directionEnum.RIGHT:
	            that.playArea.updateGameState(directionEnum.RIGHT);
	            that.playArea.displaySlides();
	            break;
	        case directionEnum.DOWN:
	            that.playArea.updateGameState(directionEnum.DOWN);
	            that.playArea.displaySlides();
	            break;
	    }
    }

    //detect and apply the onclick event
    that.playArea.gameCanvas.onclick = function(e) {
    	var clickedIndexX = Math.floor((e.pageY - this.offsetTop) /(that.playArea.heightCanvas / that.playArea.gameDimension));
    	var clickedIndexY = Math.floor((e.pageX - this.offsetLeft) / (that.playArea.widthCanvas / that.playArea.gameDimension));
    	console.log('Clicked:X',clickedIndexX);
    	console.log('Clicked:Y',clickedIndexY);

    	//searching for the empty tile and swaping
    	for (var i = 0; i < that.playArea.gameDimension; i++) {
    		for (var j = 0; j < that.playArea.gameDimension; j++) {
    			if(that.playArea.gameState.Data[i][j] == 0){
    				if ((Math.abs(i - clickedIndexX) + Math.abs(j - clickedIndexY)) == 1) {
    					that.playArea.gameState.swapValueAt(i, j, clickedIndexX, clickedIndexY);
    					that.playArea.displaySlides();
    					console.log('swaped:');
    				}
    			}		
    		}
    	}
    }
}