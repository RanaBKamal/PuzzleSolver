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

	var threshold;
	var iterationSize;
	if(that.initialNode.state.row == 2){
		threshold = 2;
		iterationSize = 2;
	}
	else if(that.initialNode.state.row == 3){
		threshold = 12;
		iterationSize = 10;
	}
	else{
		threshold = 30;
		iterationSize =15;
	}
	function sortMatrix(a,b){
		return a.state.manhattanDistance() < b.state.manhattanDistance();
	}

	/* This is going to be a hell of a ride*/
	this.solve = function(){
		startTime = (new Date()).getTime();
		var rootNode = new SlideNode(that.initialNode.state);
		if(rootNode.state.isSolved()){
			console.log('finished');
		}else{	
			while(1){
				if(that.fringe.sequence.length == 0){
					console.log('Iteration');
					var rootChildren = rootNode.getChildren();
					//console.log(typeof(rootChildren[0]));
					rootChildren.sort(sortMatrix);
					that.fringe.putChildren(rootChildren);
					if (rootChildren.length > 2) {
						rootChildren.shift();
					}
					threshold += iterationSize;
					console.log('threshold',threshold);
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
						return Util.arrayCopy(that.solutionStep);
					}
					else{
						//console.log('after fail:::',counter,':',currentNode.depth);
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
			}
		}
	return true;
	}
}	