function Fringe(){
	this.sequence = [];
	var that = this;
	this.putChildren = function(children){
		for (var index in children) {
			that.sequence.push(children[index]);
		}
	}

	this.getChild = function(){
		return that.sequence.pop();
	}
}