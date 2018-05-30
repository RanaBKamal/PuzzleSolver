/************************************
	Author:Kamal Bahadur Rana
	Date Written: May 29, 2018
	Updated: 
************************************/
function FlowControl(gameWindowId){
	this.gameWindow = gameWindowId;

	var that = this;

	// initial game control
	this.initFlowControl = function(){
		// currently disable playArea
		that.disablePlayArea();
		// disable autosolve button
		that.disableAutosolveButton();
	}

	// function when game starts
	this.gameStartControl = function(){
		// enable playarea | disable playbutton | enable autosolve button | disable control
		that.enablePlayArea();
		that.disablePlayButton();
		that.enableAutosolveButton();
		that.disableControl();
	}
	this.gameFinishedControl = function(){
		that.disablePlayArea();
		that.enablePlayButton();
		that.disableAutosolveButton();
		that.enableControl();	
	}

	// function for autosolve control
	this.autosolveControl = function(){
		// disable the other options
    	that.disablePlayArea();
    	that.disablePlayButton();
    	that.disableControl();
    	that.disableAutosolveButton();
	}

	// function to disable playArea
	this.enablePlayArea = function(){
		var sliderWrapper = document.getElementById(that.gameWindow.sliderWrpId);
		sliderWrapper.style['position'] = 'static';
		var frontBlocker = document.getElementById(that.gameWindow.frontBlockerId);
		frontBlocker.style['cursor'] = "pointer";
		frontBlocker.style['opacity'] = "1";
		frontBlocker.disabled = false;
		frontBlocker.style['display'] = 'none';
	}
	// function to enable playArea
	this.disablePlayArea = function(){
		var sliderWrapper = document.getElementById(that.gameWindow.sliderWrpId);
		sliderWrapper.style['position'] = 'relative';
		var frontBlocker = document.getElementById(that.gameWindow.frontBlockerId);
		frontBlocker.style['cursor'] = "not-allowed";
		frontBlocker.style['opacity'] = "0.7";
		frontBlocker.disabled = true;
		frontBlocker.style['display'] = 'block';
	}

	// function to enable the control button
	this.enableControl = function(){
		var controlButton = document.getElementById(that.gameWindow.scaleId);
		controlButton.style['cursor'] = "pointer";
		controlButton.style['opacity'] = 1;
		controlButton.disabled = false;
	}
	// function to disable the control button
	this.disableControl = function(){
		var controlButton = document.getElementById(that.gameWindow.scaleId);
		controlButton.style['opacity'] = 0.7;
		controlButton.disabled = true;
	}

	//function to enable auto solve button initially
	this.enableAutosolveButton = function(){
		var autosolveButton = document.getElementById(that.gameWindow.autoSolveId);
		autosolveButton.style['cursor'] = "pointer";
		autosolveButton.style['opacity'] = "1";
		autosolveButton.disabled = false;
	}
	//function to disable auto solve button initially
	this.disableAutosolveButton = function(){
		var autosolveButton = document.getElementById(that.gameWindow.autoSolveId);
		autosolveButton.style['cursor'] = "not-allowed";
		autosolveButton.style['opacity'] = "0.7";
		autosolveButton.disabled = true;
	}


	// function to enable the play button
	this.enablePlayButton = function(){
		var playButton = document.getElementById(that.gameWindow.playBId);
		playButton.style['cursor'] = "pointer";
		playButton.style['opacity'] = "1";
		playButton.disabled = false;
	}
	// function to disable the play button
	this.disablePlayButton = function(){
		var playButton = document.getElementById(that.gameWindow.playBId);
		playButton.style['cursor'] = "not-allowed";
		playButton.style['opacity'] = "0.7";
		playButton.disabled = true;
	}


}