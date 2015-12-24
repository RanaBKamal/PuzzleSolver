function Problem(initialNode, goalNode){
	this.initialNode = initialNode;
	this.goalNode = goalNode;
	//console.log(' I am currently ');this.initialNode.state.displayConsole();
	//console.log(' I am trying to reach');this.goalNode.state.displayConsole();
	this.fringe = new Fringe();
	this.solutionStep = [];

	var that = this;


	/* This is going to be a hell of a ride*/
	this.solve = function(){
		var rootNode = new SlideNode(that.initialNode.state);
		var rootChildren = rootNode.getChildren();

		for(var curChild in rootChildren){
			 rootChildren[curChild].state.displayConsole();
		}
		that.fringe.putChildren(rootChildren);

		if(rootNode.state.isSolved()){
			console.log('finished');
			return 0;
		}	

		var counter = 0;
		while(counter < 999999){
			if(that.fringe.sequence.length == 0){
				console.log('there is no solution');
				return [];
			}else {
				var currentNode = that.fringe.getChild();
				if(currentNode.state.isSolved()){
					console.log('solution found:');
					that.solutionStep = currentNode.getStepsTaken();
					console.log('HERE IS THE SOLUTION::');
					var current = that.initialNode;
					for(var index in that.solutionStep){
						console.log('step:',that.solutionStep[index]);
						current.state.move(that.solutionStep[index]);
					}
					console.log('Depth is :',currentNode.getDepth());
					return Util.arrayCopy(that.solutionStep);
				}
				else{
					var children = currentNode.getChildren();
					that.fringe.putChildren(children);
				}
			}
			counter++;
		}
		return [];
	}

	//display the information
	this.displayProblemInfo = function(){
		console.log('i am at:',that.initialNode);
		console.log('i am heading to:',that.goalNode);
	}
}	
