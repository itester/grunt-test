var common = (function(){
	var Common = function(){

	};
	Common.prototype.extend = function(base, sub){
		if(!(base instanceof Object) || !(sub instanceof Object)){
			return false;
		}
		var origProto = sub.prototype;
		sub.prototype = Object.create(base.prototype);
		for (var key in origProto)  {
		 sub.prototype[key] = origProto[key];
		}
		sub.prototype.constructor = sub;
		Object.defineProperty(sub.prototype, 'constructor', { 
		enumerable: false, 
		value: sub 
		});
	};
	Common.prototype.test = function(){

	};
	return new Common();
})();