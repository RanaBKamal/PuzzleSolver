/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 20, 2015 
************************************/
function Fringe(){
	//this holds the node objects
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