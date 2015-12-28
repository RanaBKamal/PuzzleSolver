/********xxxxx****************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 18, 2015
	Upadated :Dec 20, 2015 
************************************/

function Play(playArea,scoreB,autoSolveB) {
	this.playArea = playArea;
    this.scoreB = scoreB;
    this.autoSolveB = autoSolveB;
	var that = this;

    //sliding the tiles
	function moveSlide(keyCode){
		that.playArea.gameState.move(keyCode);
		that.playArea.displaySlides();
        that.scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
        if (that.playArea.gameState.isSolved()) {
        	that.displayWin();
        }
	}

    

	//keyDown event handling
	document.onkeydown = function(e) {
		moveSlide(e.keyCode);
    }

    //detect and apply the onclick event
    this.playArea.gameCanvas.onclick = function(e) {
		var clickIndex = new Object();
    	clickIndex.y = Math.floor((e.pageX - this.offsetLeft) / (that.playArea.widthCanvas / that.playArea.gameDimension));
    	clickIndex.x = Math.floor((e.pageY - this.offsetTop) /(that.playArea.heightCanvas / that.playArea.gameDimension));
    	console.log('clickinded ',clickIndex);
    	var emptyIndex = that.playArea.gameState.emptyLocation;
    	console.log('emptyIndex ',emptyIndex);
    	var moveDirection = getDirection(clickIndex,emptyIndex);
    	console.log(' Move direction generated ',moveDirection);
    	moveSlide(moveDirection);
  
    	function getDirection(clickIndex,emptyIndex){
    		if((clickIndex.y - emptyIndex.y == 1) && (clickIndex.x == emptyIndex.x))
    			return that.playArea.gameState.directionEnum.LEFT;
    		else if((emptyIndex.y - clickIndex.y == 1) && (clickIndex.x == emptyIndex.x))
    			return that.playArea.gameState.directionEnum.RIGHT;
    		else if((clickIndex.y == emptyIndex.y) && (clickIndex.x - emptyIndex.x == 1))
    			return that.playArea.gameState.directionEnum.UP;
    		else if((clickIndex.y == emptyIndex.y ) && (emptyIndex.x - clickIndex.x == 1))
    			return that.playArea.gameState.directionEnum.DOWN;
    		else
    			return false;
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
		that.playArea.context.fillText("SOLVED !!!",80,300);
    }

    this.displayAutoSolve = function(keyCode){
        that.playArea.gameState.move(keyCode);
        that.playArea.displaySlides();
        that.scoreB.innerHTML = 'Steps:' + that.playArea.gameState.stepsMoved;
    }

    //function to suto solve
    that.autoSolveB.onclick = function(){
        var initialNode = new SlideNode(that.playArea.gameState);
        var goalState = new Matrix(that.playArea.gameState.row,that.playArea.gameState.row);
        goalState.initialize();
        var goalNode = new SlideNode(goalState);

        var solution = new Problem(initialNode,goalNode);
        var stepsToMove = solution.solve();
        that.playArea.gameState.stepsMoved = 0;
        var intervalId = setInterval(function(){
            if (stepsToMove.length == 0) {
                clearInterval(intervalId);
            }
            that.displayAutoSolve(stepsToMove[0]);
            stepsToMove.shift();
            console.log('i am executing');
        },1000);
    }
}