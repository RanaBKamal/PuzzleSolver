/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 20, 2015 
************************************/
function SlideNode(stateMatrix){
	//the matrix state of the game
	this.state = Util.copyMatrix(stateMatrix);
	this.slideAction = this.state.directionEnum.INVALID;
	this.pathCost = 0;
	this.depth = 0;
	this.stepsTaken = [];

	var direction = this.state.directionEnum;
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
		that.stepsTaken = steps.slice();
	}

	this.getDepth = function(){
		return that.depth;
	}

	this.getStepsTaken = function(){
		var locStepsTaken = that.stepsTaken.slice();
		return locStepsTaken;
	}

	that.getGameState = function(){
		var locState = that.state.slice();
		return locState;
	}

	this.getChildren = function(){
		//getting the possible childrens of the node
		var childNodes = [];
		var lastAction = that.slideAction;

		//compute reverse action to prevent back to prvious state
		var reverseAction = 
		(	
			lastAction == direction.UP ? direction.DOWN :
			(
				lastAction == direction.DOWN ? direction.UP:
				(
					lastAction == direction.LEFT ? direction.RIGHT :
					(
						lastAction == direction.RIGHT ? direction.LEFT : direction.INVALID
					) 
				) 
			)
		);

		var moves = that.state.getAllMoves();
		var refinedMoves = [];
		for(var index in moves ){
			if (moves[index] != reverseAction) {
				refinedMoves.push(moves[index]);
			}
		}
		
		//to return only refined moves
		for ( var index in refinedMoves){
			var currentMove = refinedMoves[index];
			var child = that.state.makeOneMove(currentMove);
			var localSteps = that.stepsTaken.slice();
			localSteps.push(currentMove);
			var currentSlideNode = new SlideNode(child);
			currentSlideNode.setAction(currentMove);
			currentSlideNode.setDepth(that.depth + 1);
			currentSlideNode.setPathCost(1);
			currentSlideNode.setStepsTaken(localSteps);
			childNodes.push(currentSlideNode);
		}
		return childNodes;
	}
}