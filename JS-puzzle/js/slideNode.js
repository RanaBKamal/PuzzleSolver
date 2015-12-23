
function SlideNode(gameState,ancestor){
	this.gameState = gameState;
	this.ancestor = ancestor;
	this.slideAction = this.gameState.directionEnum.UP;
	this.pathCost = 0;
	this.depth = 0;
	this.stepsTaken = [];

	var direction = this.gameState.directionEnum;
	var that = this;

	
	this.setAction = function(slideAction){
		that.slideAction = slideAction;
	}
	this.setDepth = function(depth){
		that.depth = depth;
	}
	this.setPathCost = function(pathCost){
		that.pathCost = pathCost;
	}

	this.setStepsTaken = function(steps){
		that.stepsTaken = steps;
	}
	this.getDepth = function(){
		return that.depth;
	}
	this.getStepsTaken = function(){
		return that.stepsTaken;
	}
	that.getGameState = function(){
		return that.gameState;
	}

	this.getChildren = function(){
		var lastAction = that.slideAction;
		var reverseAction = 
		(	
			lastAction == direction.UP ? direction.DOWN :
			(
				lastAction == direction.DOWN ? direction.UP:
				(
					lastAction == direction.LEFT ? direction.RIGHT : direction.LEFT
				) 
			)
		);

		console.log('lastAction was:',lastAction,'reverseAction was:',reverseAction);

		var moves = that.gameState.getAllMoves();
		var refinedMoves = [];
		for(var move in moves ){
			if (moves[move] != reverseAction) {
				refinedMoves.push(moves[move]);
			}
		}

		var children = that.gameState.makeAllMoves();
		var childNodes = [];
		var counter = 0;

		for ( var move in refinedMoves){
			var child = that.gameState.makeOneMoves(refinedMoves[move]);
			var localSteps = that.stepsTaken;
			localSteps.push(refinedMoves[move]);

			var currentSlideNode = new SlideNode(child,that.gameState);
			currentSlideNode.setAction(refinedMoves[move]);
			currentSlideNode.setDepth(that.depth + 1);
			currentSlideNode.setPathCost(1);
			currentSlideNode.setStepsTaken(localSteps);
			childNodes.push(currentSlideNode);
			counter++;
		}
		return childNodes;
	}

	//functin to display the detail of thr node
	this.displayNodeDetail = function(){
		console.log('gameState:',that.gameState);
		console.log('Ancestor:',that.ancestor);
		console.log('Depth:',that.depth);
		console.log('cost:',that.cost);
		console.log('action:',that.slideAction);
	}
} 