function Problem(initialNode, goalNode){
	this.initialNode = initialNode;
	this.goalNode = goalNode;
	console.log(' I am currently ');this.initialNode.state.displayConsole();
	console.log(' I am trying to reach');this.goalNode.state.displayConsole();
	this.fringe = new Fringe();
	this.solutionStep = [];

	var that = this;

	var heuristic = new Heuristic(initialNode.state);
	//for time calculation
	var startTime;
	var stopTime;

	/* This is going to be a hell of a ride*/
	this.solve = function(){
		startTime = (new Date()).getTime();
		var rootNode = new SlideNode(that.initialNode.state);
		var rootChildren = rootNode.getChildren();
		for(var index = 0; index < rootChildren.length - 1; index++){
			for (var i = (index + 1); i < rootChildren.length; i++) {
				if (heuristic.costCurrentToGoal(rootChildren[index].state) < heuristic.costCurrentToGoal(rootChildren[i].state)){
					var temp = rootChildren[index];
					rootChildren[index] = rootChildren[i];
					rootChildren[i] = temp;
				}
			}	
		}
		that.fringe.putChildren(rootChildren);

		console.log('first step finished');
		if(rootNode.state.isSolved()){
			console.log('finished');
		}else{	
			var counter = 0;
			while(counter < 999999){
				if(that.fringe.sequence.length == 0){
					console.log('there is no solution');
					return false;
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
						stopTime = (new Date()).getTime();
						console.log('Time Taken:', stopTime - startTime,'milliseconds');
						console.log('Depth is :',currentNode.getDepth());
						return true;
					}
					else{
						console.log('after fail:::',counter,':',currentNode.depth);
						if (currentNode.depth < 25) {
							var children = currentNode.getChildren();
							for(var index = 0; index < children.length - 1;index++){
								for (var i = index + 1; i < children.length; i++) {
									if (heuristic.costCurrentToGoal(children[index].state) < heuristic.costCurrentToGoal(children[i].state)){
										var temp = children[index];
										children[index] = children[i];
										children[i] = temp;
									}
								}	
							}
							that.fringe.putChildren(children);
						}
					}
				}
				counter++;
			}
		}
	
	return true;
	}

	//display the information
	this.displayProblemInfo = function(){
		console.log('i am at:',that.initialNode);
		console.log('i am heading to:',that.goalNode);
	}
}	
