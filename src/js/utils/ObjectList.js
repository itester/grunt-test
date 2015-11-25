var BaseList = function () {
	this.data = [];
};
BaseList.prototype.init = function(data){
	if(!(data instanceof Array)){
		
	}
	this.data = data;
};

var ObjectList = (function(parent){
	var ObjectList = null;
	if(parent instanceof Object){
		ObjectList = function(){
			parent.call(this);
		};
		ObjectList.prototype.show = function(){
			return '';
		};
		common.extend(parent, ObjectList);
	}
	return ObjectList;
})(BaseList ? BaseList : null);
