function Problem(initialGameState, goalGameState){
	this.initialState = initialGameState;
	this.goalState = goalGameState;
	this.fringe = new Fringe();
	this.solutionStep = [];

	var that = this;
	//funtion to advance
	this.solve = function(){
		var rootNode = new SlideNode(that.initialState,that.initialState);
		var rootChildren = rootNode.getChildren();
		that.fringe.putChildren(rootChildren);

		var counter = 0;
		while(counter < 999){
			if(that.fringe.sequence.length == 0){
				console.log('there is no solution');
				return false;
			}
			else{
				var currentNode = that.fringe.getChild();
				if(currentNode.gameState.isSolved()){
					console.log('solution found:');
					that.solutionStep = currentNode.getStepsTaken();
					console.log('HERE IS THE SOLUTION::');
					var current = that.initialState;
					for(var step in that.solutionStep){
						console.log('step:',current.Data);
						current.move(that.solutionStep[step]);
					}
					console.log('Depth is :',currentNode.getDepth());
					return true;
				}
				else{
					var children = currentNode.getChildren();
					that.fringe.putChildren(children);
				}
			}
			counter++;
		}
		return true;
	}

	//display the information
	this.displayProblemInfo = function(){
		console.log('i am at:',that.initialState);
		console.log('i am heading to:',that.goalState);
	}
}	