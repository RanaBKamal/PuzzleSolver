
function SlideNode(stateMatrix){
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
		that.stepsTaken = Util.arrayCopy(steps);
	}
	this.getDepth = function(){
		return that.depth;
	}
	this.getStepsTaken = function(){
		var locStepsTaken = Util.arrayCopy(that.stepsTaken);
		return locStepsTaken;
	}
	that.getGameState = function(){
		var locState = Util.copyMatrix(that.state);
		return locState;
	}

	this.getChildren = function(){
		//console.log(' I am trying to generate children of'); //pass vo
		//this.state.displayConsole(); //pass vo
		var childNodes = [];
		var lastAction = that.slideAction;
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

		//console.log('lastAction was:',lastAction,'reverseAction was:',reverseAction);

		var moves = that.state.getAllMoves();
		//console.log(' possible moves are ',moves);
		var refinedMoves = [];
		for(var index in moves ){
			if (moves[index] != reverseAction) {
				refinedMoves.push(moves[index]);
			}
		}
		//console.log('refined moves ', refinedMoves)
		//jjjj

		//var children = that.state.makeAllMoves();
		//var childNodes = [];
		//var localSteps = that.stepsTaken;
		for ( var index in refinedMoves){
			var currentMove = refinedMoves[index];
			var child = that.state.makeOneMove(currentMove);
			//console.log(' TH Hchild is  moving  dirx',currentMove);
			//child.displayConsole();
			var localSteps = Util.arrayCopy(that.stepsTaken);
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

	//functin to display the detail of thr node
	this.displayNodeDetail = function(){
		console.log('gameState:',that.state);
		console.log('Ancestor:',that.ancestor);
		console.log('Depth:',that.depth);
		console.log('cost:',that.pathCost);
		console.log('action:',that.slideAction);
	}
}