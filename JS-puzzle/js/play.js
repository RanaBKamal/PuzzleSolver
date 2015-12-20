/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 18, 2015
	Upadated :Dec 20, 2015 
************************************/

function Play(playArea,scoreB) {
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
	            that.playArea.gameState.stepsMoved++;
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	alert('you Win');
	            }

	            break;
	        case directionEnum.UP:
	            that.playArea.updateGameState(directionEnum.UP);
	            that.playArea.displaySlides();
	            that.playArea.gameState.stepsMoved++;
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	alert('you Win');
	            }
	            break;
	        case directionEnum.RIGHT:
	            that.playArea.updateGameState(directionEnum.RIGHT);
	            that.playArea.displaySlides();
	            that.playArea.gameState.stepsMoved++;
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	alert('you Win');
	            }
	            break;
	        case directionEnum.DOWN:
	            that.playArea.updateGameState(directionEnum.DOWN);
	            that.playArea.displaySlides();
	            that.playArea.gameState.stepsMoved++;
	            scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
	            if (that.playArea.gameState.isSolved()) {
	            	alert('you Win');
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
    					that.playArea.displaySlides();
    					that.playArea.gameState.stepsMoved++;
    					scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
    					if (that.playArea.gameState.isSolved()) {
	            			alert('you Win');
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
}