/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015 
	Updated Date: Dec 18, 2015
	Updated Date: Dec 20, 2015
************************************/


function Matrix(row,col){
	
	this.directionEnum = Object.freeze({
		LEFT: 37, 
		RIGHT: 39, 
		UP: 38,
		DOWN:40
	});

	this.stepsMoved = 0;
	this.row = row;
	this.col = col;
	
	this.emptyLocation = new Object();
	
	this.Data = new Array(this.row);

	for (var i = 0; i < this.row; i++) {
		this.Data[i] = new Array(this.col);
	};

	var that = this;
	this.initialize = function(){
		var k =  1;
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				that.Data[i][j] = k++;
			}
		}
		that.Data[that.row - 1][that.col - 1] = 0;
		that.emptyLocation.x = that.row-1;
		that.emptyLocation.y = that.col-1;
		console.log('empyt locations :',this.emptyLocation.x,' ',this.emptyLocation.y);
	}

	//function to get all moves
	this.getAllMoves = function(){
		var moves = [];
		if(that.emptyLocation.x == 0)
			moves.push(that.directionEnum.UP);
		if(that.emptyLocation.x >0 && that.emptyLocation.x < that.row-1){
			moves.push(that.directionEnum.UP);
			moves.push(that.directionEnum.DOWN);
		}
		if(that.emptyLocation.x == that.row -1 )
			moves.push(that.directionEnum.DOWN);
		if(that.emptyLocation.y == 0)
			moves.push(that.directionEnum.LEFT)
		if(that.emptyLocation.y > 0 && that.emptyLocation.y < that.col -1){
			moves.push(that.directionEnum.RIGHT);
			moves.push(that.directionEnum.LEFT);
		}
		if(that.emptyLocation.y == that.col -1){
			moves.push(that.directionEnum.RIGHT);
		}
		return moves;
	}

	//function to return the copy of the matrix
	function returnCopyMatrix(originalMatrix){
		var oMatrix = originalMatrix;
		var cMatrix = new Matrix(oMatrix.row,oMatrix.col);
		cMatrix.initialize();

		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				cMatrix.Data[i][j] = oMatrix.Data[i][j];
			}
		}
		return cMatrix;
	}

	//function to make moves
	this.makeMoves = function(moves){
		var children = [];
		for(var move in moves){
			var current = returnCopyMatrix(that);
			current.move(moves[move]);
			children.push(current);
		}
		return children;
	}

	this.makeAllMoves = function(){
		var moves = that.getAllMoves();
		return that.makeMoves(moves);
	}

	this.makeOneMoves = function(currentMove){
		var child = returnCopyMatrix(that);
		child.move(currentMove);
		return child;
	}

	this.move = function(direction){
		switch(direction){
			case that.directionEnum.UP:
				if(that.emptyLocation.x+1 <= that.row -1){
					that.swapValueAt(that.emptyLocation.x,that.emptyLocation.y,that.emptyLocation.x+1,that.emptyLocation.y);
					that.emptyLocation.x++;
					that.stepsMoved++;
				}
				break;
			case that.directionEnum.DOWN:
				if(that.emptyLocation.x -1 >=0 ){
					that.swapValueAt(that.emptyLocation.x,that.emptyLocation.y,that.emptyLocation.x-1,that.emptyLocation.y);
					that.emptyLocation.x--;
					that.stepsMoved++;
				}
				break;
			case that.directionEnum.LEFT:
				if(that.emptyLocation.y+1 <= that.col-1){
					that.swapValueAt(that.emptyLocation.x,that.emptyLocation.y,that.emptyLocation.x,that.emptyLocation.y+1);
					that.emptyLocation.y++;
					that.stepsMoved++;

				}
				break;
			case that.directionEnum.RIGHT:
				if(that.emptyLocation.y -1 >= 0 ){
					that.swapValueAt(that.emptyLocation.x,that.emptyLocation.y,that.emptyLocation.x,that.emptyLocation.y-1);
					that.emptyLocation.y--;
					that.stepsMoved++;
				}
				break;
		}

	}

	// swap values at the specified position
	this.swapValueAt = function(x1,y1,x2,y2){
		var tempVal;
		tempVal = that.Data[x1][y1];
		that.Data[x1][y1] = that.Data[x2][y2];
		that.Data[x2][y2] = tempVal;
	}
	this.randomizeTilesPra = function(){
		var Moves = [40,38,37,39,40,38,38,39];
		for(var i = 0; i < Moves.length; i++){
			that.move(Moves[i]);
		}

	}
	
	//randomization function
	this.randomizeTiles = function(){
		initTiles();
		var totInv = sumInversions();
		console.log("total Inversions:",totInv);
		
		if (!isSolvable(that.row,that.col,emptyTileRow())) {
			if ((that.Data[0][0] == 0) || (that.Data[1][0] == 0)) {
				that.swapValueAt(that.row - 1,that.row - 1,that.row - 2, that.row - 1);
			}
			else{
				that.swapValueAt(0,0,0,1);
			}
		}

		var totInv = sumInversions();
		console.log("total Inversions:",totInv);

		//update the location of the empty position after ram=ndomization
		for(var i = 0; i < that.row; i++){
			for(var j = 0; j < that.col; j++){
				if(that.Data[i][j] == 0){
					that.emptyLocation.x = i;
					that.emptyLocation.y = j;
				}
			}
		}
		//function to randomize at first
		function initTiles(){
			var i = that.row * that.col - 1;
			while(i > 0){
				var j = Math.floor(Math.random() * i);
				var xi = i % that.row;
			    var yi = Math.floor(i / that.row);
			    var xj = j % that.row;
			    var yj = Math.floor(j / that.row);
			    that.swapValueAt(xi, yi, xj, yj);
			    --i;
			}
		}
		//function to count the inversions of each tile
		function countInversions(indexX,indexY){
			var X = indexX;
			var Y = indexY;
			var inversions = 0;
			var tileNum = X * that.row + Y + 1;
			var lastTile = that.row * that.col;
			var tileValue = that.Data[X][Y];
			for (var q = tileNum; q < lastTile; q++) {
				var k = Math.floor(q / that.row);
				var l = q % that.row;
			 	var compValue = that.Data[k][l];
			 	if(tileValue > compValue && compValue != 0){
			 		++inversions;
			 	}
			}
			return inversions;
		}
		//function to sum up the total inversions
		function sumInversions(){
			var totInversions = 0;
			for (var i = 0; i < that.row; i++) {
				for (var j = 0; j < that.col; j++) {
					totInversions += countInversions(i,j);
				}
				
			}
			return totInversions;
		}
		//check if solvable
		function isSolvable(puzWidth,puzHeight,emptyRow){
			var pRow = puzWidth;
			var pCol = puzHeight;
			var eRow = emptyRow;
			if (pRow % 2 == 1) {
				return ((sumInversions() % 2) == 0)
			}
			else{
				return (((sumInversions() + pCol - eRow)% 2) == 0)
			}				
		}
		//function to return the row position of the empty tile
		function emptyTileRow(){
			for (var i = 0; i < that.row; i++) {
				for (var j = 0; j < that.col; j++) {
					if (that.Data[i][j] == 0) {
						return (i + 1);
					}
				}	
			}
		}
	}

	//check if solved
	this.isSolved = function(){
		var k = 1;
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				if (k != (that.row * that.col)) {
					if (that.Data[i][j] != k) {
						return false;
					}
				}
				k++;
			}
		}
		return true;
	}
}