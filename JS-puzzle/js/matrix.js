/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/


function Matrix(row,col){
	this.row = row;
	this.col = col;
	this.Data = new Array(this.row);
	
	var directionEnum = Object.freeze({
		LEFT: 0, 
		RIGHT: 1, 
		UP: 2,
		DOWN:3
	});

	console.log('LEFT',directionEnum.LEFT);
	console.log('RIGHT',directionEnum.RIGHT);
	console.log('UP',directionEnum.UP);
	console.log('DOWN',directionEnum.DOWN);
	for (var i = 0; i < this.row; i++) {
		this.Data[i] = new Array(this.col);
	};
	var that = this;
	this.initialize = function(){
		var k = that.row * that.col - 1;
		for (var i = 0; i < that.row; i++) {
			for (var j = 0; j < that.col; j++) {
				that.Data[i][j] = k--;
			};
		};
		that.Data[that.row - 1][that.col - 1] = 0;
	}
	this.randomize = function(){
	}
}