/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 16, 2015
	Updated: Dec 20,2015 
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

	var that = this;
  
	this.initialize = function(){
		//main wrapper window
		var mainWindowWrapper = document.getElementById(that.divId);
		mainWindowWrapper.style.width = '800px';
		mainWindowWrapper.style.height = '600px';
		mainWindowWrapper.style.background = '#a4343a';
		mainWindowWrapper.style['margin'] = '0 auto';
		mainWindowWrapper.style['padding'] = '0';
		mainWindowWrapper.appendChild(that.makeTitleBar());
		mainWindowWrapper.appendChild(that.makeBody());
	}

	this.makeTitleBar = function(){
		var titleDiv = document.createElement('DIV');
		titleDiv.style.width = '796px';
		titleDiv.style.height = '116px';
		titleDiv.style['font-size'] = '34px';
		titleDiv.style['line-height'] = '116px';
		titleDiv.style.color = '#ff00ff';
		titleDiv.style['text-align'] = 'center';
		var t = document.createTextNode("IMAGE PUZZLE WITH AUTOSOLVER");
		titleDiv.appendChild(t);
		titleDiv.style.background = '#4dadef';
		titleDiv.style['border'] = '2px solid blue';
		titleDiv.setAttribute('id',that.titleWrpId);
		return titleDiv;
	}

	this.makeBody = function(){
		//lower wrapper
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
	
	this.makeSliderWrapper = function(){
		//slider-puzzle wrapper
		var sliderWrapper = document.createElement('DIV');
		sliderWrapper.style.width = '480px';
		sliderWrapper.style.height = '480px';
		sliderWrapper.style.background = '#4f0000';
		sliderWrapper.style['padding'] = '0';
		sliderWrapper.style['float'] = 'left';
		sliderWrapper.setAttribute('id',that.sliderWrpId);
		return sliderWrapper;
	}

	
	this.makeControlWrapper = function(){
		//right control wrapper
		var controlWrapper = document.createElement('DIV');
		controlWrapper.setAttribute('id',that.bodyWrpId);
		controlWrapper.style.width = '320px';
		controlWrapper.style.height = '480px';
		controlWrapper.style.background = '#efefef';
		controlWrapper.style.float = 'left';
		controlWrapper.appendChild(that.makeControlSelector());
		controlWrapper.appendChild(that.makePlayButton());
		controlWrapper.appendChild(that.makeScoreBoard());
		controlWrapper.appendChild(that.makeAutoSolveButton());
		controlWrapper.appendChild(that.makeOriginalImage());
		return controlWrapper;
	}
	
	//control selector
	this.makeControlSelector = function(){
		//level selector container
		var levelSelectorContainer = document.createElement('DIV');
		levelSelectorContainer.style.width = '320px';
		levelSelectorContainer.style.height = '80px';
		levelSelectorContainer.style.float = 'left';
		levelSelectorContainer.style['line-height'] = '40px';
		levelSelectorContainer.style.background = '#abcdef';
		//create level selector form here
		levelSelectorContainer.innerHTML = 'Select Level <br>'+
		'<form>'+ 
			'<label>Easy</label>'+
			'<input type="range" id="'+that.scaleId+'" value="2" min="2" max="10" step="1">'+
			'<label>Hard</label>'+
		'</form>';
		levelSelectorContainer.style.color = 'purple';
		levelSelectorContainer.style['text-align'] = 'center';	
		return levelSelectorContainer;
	}

	//play button
	this.makePlayButton = function(){
		//level selector container
		var playButtonContainer = document.createElement('BUTTON');
		playButtonContainer.setAttribute('id',that.playBId);
		playButtonContainer.style.width = '320px';
		playButtonContainer.style.height = '40px';
		playButtonContainer.style.float = 'left';
		playButtonContainer.style['line-height'] = '40px';
		playButtonContainer.style.background = '#cdadef';
		var t = document.createTextNode("PLAY");
		playButtonContainer.appendChild(t);
		playButtonContainer.style.color = 'purple';
		playButtonContainer.style['text-align'] = 'center';
		return playButtonContainer;
	}

	//score board 
	this.makeScoreBoard = function(){
		//level selector container
		var scoreContainer = document.createElement('SPAN');
		scoreContainer.setAttribute('id',that.scoreBId);
		scoreContainer.style.width = '320px';
		scoreContainer.style.height = '60px';
		scoreContainer.style.float = 'left';
		scoreContainer.style['line-height'] = '60px';
		scoreContainer.style.background = '#7dadef';
		scoreContainer.style.color = 'purple';
		scoreContainer.style['text-align'] = 'center';
		return scoreContainer;
	}

	//score board 
	this.makeAutoSolveButton = function(){
		//level selector container
		var solveButtonContainer = document.createElement('BUTTON');
		solveButtonContainer.setAttribute('id',that.autoSolveId);
		solveButtonContainer.style.width = '320px';
		solveButtonContainer.style.height = '60px';
		solveButtonContainer.style.float = 'left';
		solveButtonContainer.style['line-height'] = '60px';
		solveButtonContainer.style.background = '#7dadef';
		solveButtonContainer.style['font-weight'] = 'bold';
		var t = document.createTextNode("AUTO SOLVE");
		solveButtonContainer.appendChild(t);
		solveButtonContainer.style.color = 'purple';
		solveButtonContainer.style['text-align'] = 'center';
		return solveButtonContainer;
	}

	this.makeOriginalImage = function(){
		var originalImageContainer = document.createElement('IMG');
		originalImageContainer.style.width = '240px';
		originalImageContainer.style.height = '240px';
		originalImageContainer.src = 'images/elephant.png';
		originalImageContainer.style['padding-left'] = '40px';
		originalImageContainer.style['padding-right'] = '40px';
		return originalImageContainer;		
	}

}