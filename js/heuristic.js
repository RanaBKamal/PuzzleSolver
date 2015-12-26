function Heuristic(initialState){
	//initialization for the x and y positions
	var row = initialState.row;
	var col = initialState.col;





	//function to compute manhattan distance from initial to current
	this.costInitToCurrent = function(currentState){
		for (var i = 0; i < currentState.row; i++) {
			for (var i = 0; i < currentState.col; i++) {
				var currentValue = currentState.Data[i][j];
			}
			
		}
	}

	//manhattan distance for the heuristic
	this.costCurrentToGoal = function(currentState){
		var counter = 0;
		for (var i = 0; i < currentState.row; i++) {
			for (var j = 0; j < currentState.col; j++) {
				var value = currentState.Data[i][j];
				if (value != 0) {
					var expectedRow = Math.floor((value - 1) / currentState.row);
					var expectedCol = Math.floor((value - 1) % currentState. row);
					var difference = Math.abs(expectedRow - i) + Math.abs(expectedCol - j);
					counter += difference;
				}
			}
		}
		return counter;
	}

}