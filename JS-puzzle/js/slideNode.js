
function SlideNode(gameState,ancestor){
	this.gameState = getAllMoves;
	this.ancestor = ancestor;
	this.slideAction;
	this.pathCost = 0;
	this.depth = 0;
	this.stepsTaken = new Array();

	var direction = gameState.directionEnum;
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


	this.getChildren = function(){
		that.lastAction = slideAction;
		var reverseAction = 
		(	
			that.lastAction == direction.UP ? direction.DOWN :
			(
				that.lastAction == direction.DOWN ? direction.UP:
				(
					that.lastAction == direction.LEFT ? direction.RIGHT : direction.LEFT
				) 
			)
		);

		console.log('lastAction was:',lastAction,'reverseAction was:',reverseAction);

		var moves = that.gameState.getAllMoves();
		var refinedMoves = [];
		for(var move in moves ){
			if (move != reverseAction) {
				refinedMoves.push(move);
			}
		}
	}
} 
