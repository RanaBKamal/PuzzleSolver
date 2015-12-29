function Fringe(){
	this.sequence = [];
	var that = this;
	this.putChildren = function(children){
		var childrenToPush = children;
		for(var child in childrenToPush){
		that.sequence.push(childrenToPush[child]);
		}
	}

	this.getChild = function(){
		return that.sequence.pop();
	}
}