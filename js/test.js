function Puzzle(puzzleDimension){
	this.puzzleDimension = puzzleDimension;
	
	var initialState =  new Matrix(puzzleDimension,puzzleDimension);
	var finalState = new Matrix(puzzleDimension,puzzleDimension);
	
	initialState.initialize();
	initialState.randomize();




	// var randMoves = [];
	  	
	// for(var i = 0; i < 100000;i++){
	// 	randMoves.push(40 - Math.floor(Math.random() * 3));
	// }

	// for (var index in randMoves){
	// 	initialState.move(randMoves[index]);
	// }

	finalState.initialize();

	var initialNode = new SlideNode(initialState);
	var finalNode = new SlideNode(finalState);

	var curProblem = new Problem(initialNode,finalNode);
	curProblem.solve();

}