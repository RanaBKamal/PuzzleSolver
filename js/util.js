function UtilityFunctions(){
	this.copyMatrix = function(oldMatrix){
		var copiedMatrix =  new Matrix(oldMatrix.row,oldMatrix.col);
		copiedMatrix.initialize();
		for(var i = 0; i < oldMatrix.row; i++){
			for(var j = 0; j< oldMatrix.col; j++){
				copiedMatrix.Data[i][j] = oldMatrix.Data[i][j];
			}
		}
		copiedMatrix.emptyLocation.x = oldMatrix.emptyLocation.x;
		copiedMatrix.emptyLocation.y = oldMatrix.emptyLocation.y;
		copiedMatrix.stepsMoved = oldMatrix.stepsMoved;
		return copiedMatrix;
	}
}
Util = new UtilityFunctions();