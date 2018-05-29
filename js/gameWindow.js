/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015
	Updated: Dec 29,2015 
************************************/
function GameWindow(divId){
	this.divId = divId;
	this.titleWrpId = divId + 'TitleWrp';
	this.bodyWrpId = divId + 'BodyWrp';
	this.sliderWrpId = divId + 'SliderWrp';
	this.controlWrpId = divId + 'ControlWrp';
	this.canvasId = divId + 'Canvas';
	this.scaleId = divId + 'Scale';
	this.playBId = divId + 'playB';
	this.scoreBId = divId + 'ScoreB';
	this.autoSolveId = divId + 'autoSolve';
	this.frontBlockerId = divId + 'frontBlocker';

	var that = this;
  	//main wrapper window
	this.initialize = function(){
		var mainWindowWrapper = document.getElementById(that.divId);
		mainWindowWrapper.style.width = '800px';
		mainWindowWrapper.style.height = '600px';
		mainWindowWrapper.style.background = '#a4343a';
		mainWindowWrapper.style['margin'] = '0 auto';
		mainWindowWrapper.style['padding'] = '0';
		mainWindowWrapper.appendChild(that.makeTitleBar());
		mainWindowWrapper.appendChild(that.makeBody());
	}

	//titlebar maker
	this.makeTitleBar = function(){
		var titleDiv = document.createElement('DIV');
		titleDiv.style.width = '800px';
		titleDiv.style.height = '120px';
		titleDiv.style['font-size'] = '34px';
		titleDiv.style['line-height'] = '116px';
		titleDiv.style.backgroundImage = 'url("images/title.png")';
		titleDiv.setAttribute('id',that.titleWrpId);
		return titleDiv;
	}

	//lower body wrapper 
	this.makeBody = function(){
		var bodyWrapper = document.createElement('DIV');
		bodyWrapper.style.width = '800px';
		bodyWrapper.style.height = '480px';
		bodyWrapper.style.background = '#24343a';
		bodyWrapper.style['margin'] = '0 auto';
		bodyWrapper.style['padding'] = '0';
		bodyWrapper.setAttribute('id',that.bodyWrpId);
		bodyWrapper.appendChild(that.makeSliderWrapper());
		bodyWrapper.appendChild(that.makeControlWrapper());
		return bodyWrapper;
	}
	
	//slider-puzzle wrapper
	this.makeSliderWrapper = function(){
		var sliderWrapper = document.createElement('DIV');
		sliderWrapper.style.width = '480px';
		sliderWrapper.style.height = '480px';
		sliderWrapper.style.background = '#363636';
		sliderWrapper.style['padding'] = '0';
		sliderWrapper.style['float'] = 'left';
		sliderWrapper.setAttribute('id',that.sliderWrpId);
		sliderWrapper.appendChild(that.makeFrontBlocker());
		return sliderWrapper;
	}

	// function to make blocker over playArea
	this.makeFrontBlocker = function(){
		var frontBlocker = document.createElement("DIV");
		frontBlocker.setAttribute('id',that.frontBlockerId);
		frontBlocker.style.width = '480px';
		frontBlocker.style.height = '480px';
		frontBlocker.style['position'] = 'absolute';
		frontBlocker.style['z-index'] = '999';
		return frontBlocker;
	}

	//right control wrapper
	this.makeControlWrapper = function(){		
		var controlWrapper = document.createElement('DIV');
		controlWrapper.setAttribute('id',that.bodyWrpId);
		controlWrapper.style.width = '240px';
		controlWrapper.style.height = '470px';
		controlWrapper.style['padding-left'] = '40px';
		controlWrapper.style['padding-right'] = '40px';
		controlWrapper.style['padding-top'] = '10px';
		controlWrapper.style.background = '#969696';
		controlWrapper.style.float = 'left';
		controlWrapper.appendChild(that.makeControlSelector());
		controlWrapper.appendChild(that.makePlayButton());
		controlWrapper.appendChild(that.makeScoreBoard());
		controlWrapper.appendChild(that.makeAutoSolveButton());
		controlWrapper.appendChild(that.makeOriginalImage());
		return controlWrapper;
	}
	
	//level control selector
	this.makeControlSelector = function(){
		var levelSelectorContainer = document.createElement('DIV');
		levelSelectorContainer.style.width = '240px';
		levelSelectorContainer.style.height = '80px';
		levelSelectorContainer.style.float = 'left';
		levelSelectorContainer.style['line-height'] = '40px';
		levelSelectorContainer.style['font-weight'] = 'bold';
		levelSelectorContainer.style.background = '#abcdef';
		levelSelectorContainer.style.fontFamily = 'verdana';
		levelSelectorContainer.innerHTML = 'Select Level <br>'+
		'<form>'+ 
			'<input type="range" id="'+that.scaleId+'" value="2" min="2" max="4" step="1">'
		'</form>';
		levelSelectorContainer.style.color = '#123456';
		levelSelectorContainer.style['text-align'] = 'center';	
		return levelSelectorContainer;
	}

	//play button
	this.makePlayButton = function(){
		var playButtonContainer = document.createElement('BUTTON');
		playButtonContainer.setAttribute('id',that.playBId);
		playButtonContainer.style.width = '240px';
		playButtonContainer.style.height = '40px';
		playButtonContainer.style['cursor'] = 'pointer';
		playButtonContainer.style.float = 'left';
		playButtonContainer.style['line-height'] = '40px';
		playButtonContainer.style.backgroundImage = 'url("images/play_1.png")';
		playButtonContainer.style['text-align'] = 'center';
		return playButtonContainer;
	}

	//score board 
	this.makeScoreBoard = function(){
		var scoreContainer = document.createElement('SPAN');
		scoreContainer.setAttribute('id',that.scoreBId);
		scoreContainer.style.width = '240px';
		scoreContainer.style.height = '40px';
		scoreContainer.style.float = 'left';
		scoreContainer.style.fontFamily = 'verdana';
		scoreContainer.style.fontWeight = 'bold';
		scoreContainer.style.fontSize = '24px';
		scoreContainer.style['line-height'] = '40px';
		scoreContainer.style.background = '#7dadef';
		scoreContainer.style.color = '#123456';
		scoreContainer.style['text-align'] = 'center';
		return scoreContainer;
	}

	//auto solve button
	this.makeAutoSolveButton = function(){
		var solveButtonContainer = document.createElement('BUTTON');
		solveButtonContainer.setAttribute('id',that.autoSolveId);
		solveButtonContainer.style.width = '240px';
		solveButtonContainer.style.height = '40px';
		solveButtonContainer.style.float = 'left';
		solveButtonContainer.style['line-height'] = '40px';
		solveButtonContainer.style['cursor'] = 'pointer';
		solveButtonContainer.style.backgroundImage = 'url("images/autosolve_button.png")';
		solveButtonContainer.style['text-align'] = 'center';
		return solveButtonContainer;
	}

	//original image display
	this.makeOriginalImage = function(){
		var originalImageContainer = document.createElement('IMG');
		originalImageContainer.style.width = '240px';
		originalImageContainer.style.height = '240px';
		originalImageContainer.style.paddingTop = '20px';
		originalImageContainer.style.paddingBottom = '20px';
		originalImageContainer.src = 'images/danphe.png';
		return originalImageContainer;
	}
}