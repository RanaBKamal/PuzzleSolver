/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/


function Matrix(row,col){
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

	//to be wtitten here
	this.randomize = function(){
	
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
}