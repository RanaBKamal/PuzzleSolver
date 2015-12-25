function Problem(initialNode, goalNode){
	this.initialNode = initialNode;
	this.goalNode = goalNode;
	console.log(' I am currently ');this.initialNode.state.displayConsole();
	console.log(' I am trying to reach');this.goalNode.state.displayConsole();
	this.fringe = new Fringe();
	this.solutionStep = [];

	var that = this;


	//for time calculation
	var startTime;
	var stopTime;

	/* This is going to be a hell of a ride*/
	this.solve = function(){
		startTime = (new Date()).getTime();
		var heuristic = new Heuristic();
		var manhattanDist = 500;
		var tempManhattanDist;
		var rootNode = new SlideNode(that.initialNode.state);
		var rootChildren = rootNode.getChildren();
		console.log('Children Are:');
		for(var index in rootChildren){
			rootChildren[index].state.displayConsole();
			tempManhattanDist = heuristic.calculateManhattanDistance(rootChildren[index].state);
			that.fringe.putChild(rootChildren[index]);
			if (tempManhattanDist < manhattanDist) {
				console.log('i am checking');
				manhattanDist = tempManhattanDist;
				that.fringe.getChild();
				that.fringe.putChild(rootChildren[index]);
			}
		}

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
					//console.log('current node:',currentNode);
					//console.log('isSolved checked:',currentNode.state.isSolved());
					//console.log('current state ');//currentNode.state.displayConsole();
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
						//console.log('isSolved checked:',currentNode.state.isSolved());
						var children = currentNode.getChildren();
						manhattanDist = 500;
						//console.log('children are:',children);
						for(var index in children){
							//children[index].state.displayConsole();

							tempManhattanDist = heuristic.calculateManhattanDistance(children[index].state);
							that.fringe.putChild(children[index]);
							if (tempManhattanDist < manhattanDist) {
								manhattanDist = tempManhattanDist;
								that.fringe.getChild();
								that.fringe.putChild(children[index]);
							}
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
