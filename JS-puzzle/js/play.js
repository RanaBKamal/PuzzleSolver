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
}