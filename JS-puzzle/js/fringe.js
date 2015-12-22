function Fringe(){
	this.sequence = [];
	var that = this;
	this.putChildren = function(node){
		that.sequence.push(node);
	}
	this.getChildren = function(){
		return that.sequence.pop();
	}
}