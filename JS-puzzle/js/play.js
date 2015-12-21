/********xxxxx****************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 18, 2015
	Upadated :Dec 20, 2015 
************************************/

function Play(playArea,scoreB) {
	this.playArea = playArea;
	var that = this;

	//keyDown event handling
	document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case that.playArea.directionEnum.LEFT:
	            that.playArea.updateGameState(that.playArea.directionEnum.LEFT);
	            that.playArea.displaySlides();
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	that.displayWin();
	            }

	            break;
	        case that.playArea.directionEnum.UP:
	            that.playArea.updateGameState(that.playArea.directionEnum.UP);
	            that.playArea.displaySlides();
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	that.displayWin();
	            }
	            break;
	        case that.playArea.directionEnum.RIGHT:
	            that.playArea.updateGameState(that.playArea.directionEnum.RIGHT);
	            that.playArea.displaySlides();
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	that.displayWin();
	            }
	            break;
	        case that.playArea.directionEnum.DOWN:
	            that.playArea.updateGameState(that.playArea.directionEnum.DOWN);
	            that.playArea.displaySlides();
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	that.displayWin();
	            }
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
    			if(that.playArea.gameState.Data[i][j] == 0){//replaceable with &&
    				if (measureDistance(i, j, clickedIndexX, clickedIndexY) == 1) {
    					that.playArea.gameState.swapValueAt(i, j, clickedIndexX, clickedIndexY);
    					that.playArea.gameState.stepsMoved++;
    					that.playArea.displaySlides();
    					scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
    					if (that.playArea.gameState.isSolved()) {
	            			that.displayWin();
	            		}
    					console.log('swaped:');
    				}
    			}		
    		}
    	}
    	//function to measure distance
    	function measureDistance(x1,y1,x2,y2){
    		return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
    	}
    }

    //function to display win window
    this.displayWin = function(){
    	that.playArea.context.font="72px Verdana";
		// Create gradient
		var gradient=that.playArea.context.createLinearGradient(0,0,400,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		that.playArea.context.fillStyle=gradient;
		that.playArea.context.fillText("YOU WIN",80,300);
    }
}