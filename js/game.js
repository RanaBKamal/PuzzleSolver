/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015
	Updated: Dec 20,2015 
************************************/

function Game(gameDivId){
	this.gameDivId = gameDivId;
	var that = this;

	//create the environment for game
	that.gameWindow = new GameWindow(that.gameDivId);
	that.gameWindow.initialize();

	//initialize the canvas play area
	var currentPlayArea = new PlayArea(
		document.getElementById(that.gameWindow.sliderWrpId),
		that.gameWindow.canvasId);

	currentPlayArea.initialize();

	//level selector element
	var scaleId = that.gameWindow.scaleId;
	var scaleBox = document.getElementById(scaleId);

	//play button element
	var palyBId = that.gameWindow.playBId;
	var playB = document.getElementById(palyBId);

	//score board element
	var scoreBId = that.gameWindow.scoreBId;
	var scoreB = document.getElementById(scoreBId);

	//auto solve element
	var autoSolveId = that.gameWindow.autoSolveId;
	var autoSolveB = document.getElementById(autoSolveId);
	
	//every new game starts here
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
		//jump to play
		that.play(currentPlayArea,scoreB,autoSolveB);
	}

	//function that handles the playing
	this.play = function(playArea,scoreB,autoSolveB){
		
		//keyDown event handling
		document.onkeydown = function(e) {
			moveSlide(e.keyCode);
	    }

	    //detect and apply the onclick event
	    playArea.gameCanvas.onclick = function(e) {
			var clickIndex = new Object();
	    	clickIndex.y = Math.floor((e.pageX - this.offsetLeft) / (playArea.widthCanvas / playArea.gameDimension));
	    	clickIndex.x = Math.floor((e.pageY - this.offsetTop) /(playArea.heightCanvas / playArea.gameDimension));
	    	var emptyIndex = playArea.gameState.emptyLocation;
	    	var moveDirection = getDirection(clickIndex,emptyIndex);
	    	moveSlide(moveDirection);
	  
	    	function getDirection(clickIndex,emptyIndex){
	    		if((clickIndex.y - emptyIndex.y == 1) && (clickIndex.x == emptyIndex.x))
	    			return playArea.gameState.directionEnum.LEFT;
	    		else if((emptyIndex.y - clickIndex.y == 1) && (clickIndex.x == emptyIndex.x))
	    			return playArea.gameState.directionEnum.RIGHT;
	    		else if((clickIndex.y == emptyIndex.y) && (clickIndex.x - emptyIndex.x == 1))
	    			return playArea.gameState.directionEnum.UP;
	    		else if((clickIndex.y == emptyIndex.y ) && (emptyIndex.x - clickIndex.x == 1))
	    			return playArea.gameState.directionEnum.DOWN;
	    		else
	    			return false;
	    	}	
	    }

	    //function to auto solve
	    autoSolveB.onclick = function(){
	        var initialNode = new SlideNode(playArea.gameState);
	        var goalState = new Matrix(playArea.gameState.row,playArea.gameState.row);
	        goalState.initialize();
	        var goalNode = new SlideNode(goalState);

	        var solution = new Problem(initialNode,goalNode);
	        var stepsToMove = solution.solve();
	        if (stepsToMove == false) {
	        	scoreB.innerHTML = 'sorry try next!';
	        	console.log('takes long try another!!');
	        }
	        else{
	        	playArea.gameState.stepsMoved = 0;
		        var intervalId = setInterval(function(){
		            if (stepsToMove.length == 0) {
		                clearInterval(intervalId);
		                displayWin();
		            }
		            displayAutoSolve(stepsToMove[0]);
		            stepsToMove.shift();
		        },1000);
	        }	        
	    }

	    //function to move the one slide
		function moveSlide(keyCode){
			playArea.gameState.move(keyCode);
			playArea.displaySlides();
	        scoreB.innerHTML = 'Steps:' + playArea.gameState.stepsMoved;
	        if (playArea.gameState.isSolved()) {
	        	displayWin();
	        }
		}

		 //function to display solved window
	    function displayWin(){
	    	playArea.context.font="72px Verdana";
			var gradient=playArea.context.createLinearGradient(0,0,400,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			playArea.context.fillStyle=gradient;
			playArea.context.fillText("SOLVED !!!",80,300);
	    }

	    //auto solve display 
	    function displayAutoSolve(keyCode){
	        playArea.gameState.move(keyCode);
	        playArea.displaySlides();
	        scoreB.innerHTML = 'Steps:' + playArea.gameState.stepsMoved;
	    }
	}
}