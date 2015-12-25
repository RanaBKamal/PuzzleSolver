function Heuristic(){
	this.calculateManhattanDistance = function(state){
		var counter = 0;
		for (var i = 0; i < state.row; i++) {
			for (var j = 0; j < state.col; j++) {
				var value = state.Data[i][j];
				if (value != 0) {
					var expectedRow = Math.floor((value - 1) / state.row);
					var expectedCol = Math.floor((value - 1) % state. row);
					var difference = Math.abs(expectedRow - i) + Math.abs(expectedCol - j);
					counter += difference;
				}
			}
		}
		return counter;
	}
}