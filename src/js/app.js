(function(){
	var App = function(){
	};
	App.prototype.init = function(){
		console.log(this.appName);
	};
	return new App();
})().init();