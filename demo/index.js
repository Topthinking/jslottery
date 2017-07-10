'use strict'

var Jslottery = window.jslottery


var a = Jslottery({
		scroll_dom:'prize-cell',
		scroll_dom_css_value:'#ffff7e',
		scroll_dom_attr:'data-id',		
		scroll_dom_css:'background-color',
		start_position:Math.floor(Math.random()*12+1),
		callback:function(data){
           
        }
		});

	 function ClickMe(){
		a.options.stop_position=Math.floor(Math.random()*12+1);		
		a.options.speed=Math.floor(Math.random()*200+300);
		a.options.speed_up_position=Math.floor(Math.random()*6+1);
		a.options.speed_down_position=Math.floor(Math.random()*6+1);
		a.options.speedUp=Math.floor(Math.random()*30+20);
		a.options.speedDown=Math.floor(Math.random()*100+600);
		a.options.total_circle=Math.floor(Math.random()*5+2);
		a.start();
	}