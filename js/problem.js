function Problem(initialNode, goalNode){
	this.initialNode = initialNode;
	this.goalNode = goalNode;
	console.log(' I am currently ');this.initialNode.state.displayConsole();
	console.log(' I am trying to reach');this.goalNode.state.displayConsole();
	this.fringe = new Fringe();
	this.solutionStep = [];
	var that = this;

	//for time taken to calculate
	var startTime;
	var stopTime;

	var threshold;
	var iterationSize;
	//threshold and iterationSize for the IDA* algorithm 
	if(that.initialNode.state.row == 2){
		threshold = 2;
		iterationSize = 2;
	}
	else if(that.initialNode.state.row == 3){
		threshold = 14;
		iterationSize = 8;
	}
	else{
		threshold = 30;
		iterationSize =15;
	}
	//sorting function for the childs as function of heuristic
	function sortMatrix(a,b){
		return a.state.manhattanDistance() < b.state.manhattanDistance();
	}

	/*here goes the IDA* algorithm*/
	this.solve = function(){
		var limitCounter = 0;
		startTime = (new Date()).getTime();
		var rootNode = new SlideNode(that.initialNode.state);
		if(rootNode.state.isSolved()){
			console.log('already solved state');
		}else{	
			while(limitCounter < 999999){
				if(that.fringe.sequence.length == 0){
					console.log('Iteration');
					var rootChildren = rootNode.getChildren();
					rootChildren.sort(sortMatrix);
					that.fringe.putChildren(rootChildren);
					//pruning the nodes that has highest heuristic
					if (rootChildren.length > 2) {
						rootChildren.shift();
					}

					threshold += iterationSize;
					console.log('threshold',threshold);
				}
				else {
					var currentNode = that.fringe.getChild();
					if(currentNode.state.isSolved()){
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
						return that.solutionStep.slice();
					}
					else{
						if (currentNode.depth < threshold) {
							var children = currentNode.getChildren();
							children.sort(sortMatrix);
							if (children.length > 2) {
								children.shift();
							}
							that.fringe.putChildren(children);
						}
					}
				}
				limitCounter++;
			}
		}
	return false;
	}
}	