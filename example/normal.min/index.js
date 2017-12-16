'use strict'

var Jslottery = require('../../dist/jslottery.min.js')

var lottery = Jslottery({
	scrollDom:'prize-cell',
	scrollId:'data-id',		
	startPosition:1,
	callback:function(type,data){
		if(type==1){
			//开始滚动
			console.log("开始")
		}

		if(type==2){
			//滚动完成
			console.log("结束")
		}

		if(type==0){
			//出现错误
			console.log("错误")
			console.log(data)
		}

		if(type==3){
			//滚动每一个格子
			console.log(data)
		}
	}
});


window.ClickMe = () => {
	lottery.options.stopPosition=Math.floor(Math.random()*1+11);		
	lottery.options.speed=Math.floor(Math.random()*200+300);
	lottery.options.speedUpPosition=Math.floor(Math.random()*6+1);
	lottery.options.speedDownPosition=Math.floor(Math.random()*6+1);
	lottery.options.speedUp=Math.floor(Math.random()*30+20);
	lottery.options.speedDown=Math.floor(Math.random()*100+600);
	lottery.options.totalCircle=Math.floor(Math.random()*2+5);
	lottery.start();
}