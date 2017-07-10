'use strict'

var Jslottery = window.jslottery


var a = Jslottery({
		scrollDom:'prize-cell',
		scrollId:'data-id',		
		startPosition:1,
		callback:function(data){
           
        }
		});

	 function ClickMe(){
		a.options.stopPosition=Math.floor(Math.random()*1+11);		
		a.options.speed=Math.floor(Math.random()*200+300);
		a.options.speedUpPosition=Math.floor(Math.random()*6+1);
		a.options.speedDownPosition=Math.floor(Math.random()*6+1);
		a.options.speedUp=Math.floor(Math.random()*30+20);
		a.options.speedDown=Math.floor(Math.random()*100+600);
		a.options.totalCircle=Math.floor(Math.random()*2+5);
		a.start();
	}