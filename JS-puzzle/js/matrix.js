/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015 
	Updated Date: Dec 18, 2015
	Updated Date: Dec 20, 2015
************************************/


function Matrix(row,col){
	this.stepsMoved = 0;
	this.row = row;
	this.col = col;
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

	// swap values at the specified position
	this.swapValueAt = function(x1,y1,x2,y2){
		var tempVal;
		tempVal = that.Data[x1][y1];
		that.Data[x1][y1] = that.Data[x2][y2];
		that.Data[x2][y2] = tempVal;
	}
	

	//move up function
	this.moveUp = function(){
		loop1:
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				if (that.Data[i][j] == 0 ) {
					if ( i != (that.row  - 1)){
						that.swapValueAt(i,j ,i + 1 ,j);
						console.log('swaped at:','(',i,j,')(',i + 1,j,')');
						console.log('moveUp Clicked');
					}
					break loop1;
				}
			}
		}
	}

	//function to move down
	this.moveDown = function(){
		loop1:
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				if (that.Data[i][j] == 0 ) {
					if ( i != 0){
						that.swapValueAt(i,j ,i - 1 ,j);
						console.log('swaped at:','(',i,j,')(',i - 1,j,')');
						console.log('moveDown Clicked');
					}
					break loop1;
				}
			}
		}
	}

	//function to move left
	this.moveLeft = function(){
		loop1:
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				if (that.Data[i][j] == 0 ) {
					if ( j != (that.col - 1) ){
						that.swapValueAt(i, j, i, j + 1);
						console.log('swaped at:','(',i,j,')(',i, j + 1,')');
						console.log('moveLeft Clicked');
					}
					break loop1;
				}
			}
		}	
	}

	//function to move right
	this.moveRight = function(){
		loop1:
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				if (that.Data[i][j] == 0 ) {
					if ( j != 0){
						that.swapValueAt(i,j ,i ,j - 1);
						console.log('swaped at:','(',i,j,')(',i ,j - 1,')');
						console.log('moveRight Clicked');
					}
					break loop1;
				}
			}
		}
	}

	//to be wtitten here
	this.randomizeTiles = function(){
		
		//that.swapValueAt(0,0,that.row - 1,that.row - 1);
		initTiles();
		var totInv = sumInversions();
		console.log("total Inversions:",totInv);
		
		if (!isSolvable(that.row,that.col,emptyTileRow())) {
			if ((that.Data[0][0] == 0) || (that.Data[0][1] == 0)) {
				that.swapValueAt(that.row - 1,0,that.row - 1, 1);
			}
			else{
				that.swapValueAt(0,0,0,1);
			}
		}

		var totInv = sumInversions();
		console.log("total Inversions:",totInv);

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
			 		//console.log('tile value:',tileValue);
			 		//console.log('compValue:K,l:',k,l,':',compValue);
			 		//console.log('counted:',inversions);
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

}