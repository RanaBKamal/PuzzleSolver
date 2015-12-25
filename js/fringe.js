function Fringe(){
	this.sequence = [];
	var that = this;
	this.putChild = function(children){
		that.sequence.push(children);
	}

	this.getChild = function(){
		return that.sequence.shift();
	}
}