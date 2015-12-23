function Puzzle(puzzleDimension){
	this.puzzleDimension = puzzleDimension;
	
	var initialState =  new Matrix(puzzleDimension,puzzleDimension);
	var finalState = new Matrix(puzzleDimension,puzzleDimension);
	
	initialState.initialize();
	initialState.randomize();
	// var randMoves = [39,40,40,40,39,39];
	// for (var index in randMoves) {		
	// 			initialState.move(randMoves[index]);	
	// }
	finalState.initialize();
	
	var initialNode = new SlideNode(initialState);
	var finalNode = new SlideNode(finalState);

	var curProblem = new Problem(initialNode,finalNode);
	curProblem.solve();


}