/************************************
	Author:Kamal Bahadur Rana
	Date Written: Dec 17, 2015 
************************************/
function GameWindow(divId){
	this.divId = divId;
	this.titleWrpId = divId + 'TitleWrp';
	this.bodyWrpId = divId + 'BodyWrp';
	this.sliderWrpId = divId + 'SliderWrp';
	this.controlWrpId = divId + 'ControlWrp';
	this.canvasId = divId + 'Canvas';
	this.scaleId = divId + 'scaleId';

	var that = this;
  
	this.initialize = function(){
		//main wrapper window
		var mainWindowWrapper = document.getElementById(that.divId);
		mainWindowWrapper.style.width = '800px';
		mainWindowWrapper.style.height = '600px';
		mainWindowWrapper.style.background = '#a4343a';
		mainWindowWrapper.style['margin'] = '0 auto';
		mainWindowWrapper.style['padding'] = '0';
		//that.makeTitleBar(mainWindowWrapper);
		mainWindowWrapper.appendChild(that.makeTitleBar());
		//that.makeBody(mainWindowWrapper);
		mainWindowWrapper.appendChild(that.makeBody());
	}

	this.makeTitleBar = function(){
		//wrapper for title window
		var titleDiv = document.createElement('DIV');
		titleDiv.style.width = '796px';
		titleDiv.style.height = '116px';
		titleDiv.style.background = '#444444';
		titleDiv.style['border'] = '2px solid blue';
		titleDiv.setAttribute('id',that.titleWrpId);
		return titleDiv;
		//parent.appendChild(titleDiv);
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
		//that.makeSliderWrapper(bodyWrapper);
		//that.makeControlWrapper(bodyWrapper);
		return bodyWrapper;
		//parent.appendChild(bodyWrapper);	
	}
	
	this.makeSliderWrapper = function(){
		//slider-puzzle wrapper
		var sliderWrapper = document.createElement('DIV');
		sliderWrapper.style.width = '480px';
		sliderWrapper.style.height = '480px';
		sliderWrapper.style.background = '#14343a';
		sliderWrapper.style['padding'] = '0';
		sliderWrapper.style['float'] = 'left';
		sliderWrapper.setAttribute('id',that.sliderWrpId);
		//var currentPlayArea = new PlayArea( sliderWrapper,that.canvasId);
		//currentPlayArea.initialize();
		//currentPlayArea.drawOriginal();
		//currentPlayArea.displaySlides();
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
		return controlWrapper;
	}
	
	this.makeControlSelector = function(){
		//level selector container
		var levelSelectorContainer = document.createElement('DIV');
		levelSelectorContainer.style.width = '320px';
		levelSelectorContainer.style.height = '40px';
		levelSelectorContainer.style.float = 'left';
		levelSelectorContainer.style.background = '#abcdef';
		//create level selector form here
		levelSelectorContainer.innerHTML = ''+
		'<form>'+ 
			'<label>Easy</label>'+
			'<input type="range" id="'+that.scaleId+'" value="4" min="3" max="5" step="1">'+
			'<label>Hard</label>'+
		'</form>';
		levelSelectorContainer.style.color = 'purple';
		levelSelectorContainer.style['text-align'] = 'center';	
		//parent.appendChild(levelSelectorContainer);	
		return levelSelectorContainer;
	}

}