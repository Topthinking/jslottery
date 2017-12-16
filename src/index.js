'use strict';

let scrollDom = require('./dom')

function extend(destination,source){
    for (var property in source)
            destination[property] = source[property];
    return destination;
}

//删除一维数据的某一项
function removeArrayValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

/**
 * 
 * @param {*dom对象} obj 
 * @param {*false:删除class中得active true:添加class中得active} clear 
 */
function changeDomActive(obj,clear=false){

    let objClass = obj.getAttribute("class");

    objClass = objClass.split(" ");

    removeArrayValue(objClass,"active");

    if(!clear){ 
        objClass.push("active")
    }

    objClass = objClass.join(" ");

    obj.className = objClass;

}

let domNumber,                      //dom个数
    Lottery,                        //全局的Lottery对象                     
    LotteryTimeout = false,         //当前滚动定时器
    LotteryCircle = 0,              //当前滚动圈数
    LotteryCircleStep = 0,          //当前滚动总步数
    LotteryFinish = false,          //判断是否滚动完成
    LotteryInitSpeed = null,        //记录正常的滚动速度
    LotteryError = false,           //错误标识
    LotteryStarted = false;         //开始滚动

	
function Jslottery(opt = {}){
    var options = {
        scrollDom:null,                         //滚动显示的dom  这里是使用class选择器
        scrollId:null,                          //滚动的dom上的属性号，是用来标记滚动结束获得的id号对应的奖项
        startPosition:1,                        //开始位置
        stopPosition:2,                         //停止位置
        totalCircle:2,                          //滚动的圈数
        speed:400,                              //正常速度  （这里的速度就是定时器的时间间隔，间隔越短，速度越快）
        speedUp:100,                            //加速的时候速度
        speedDown:600,                          //减速的时候速度
        speedUpPosition:3,                      //加速点 （这里会和滚动的总步数进行比较 理论上总步数 = 总长度 * 总圈数 + stopPosition - startPosition +1 ）
        speedDownPosition:5,                    //减速点
        callback:function(type){}               /**
                                                 * 滚动回调函数   
												 *	   回调类型		 
												 *					type==1 : 开始滚动 
                                                 *                	type==2 : 停止滚动
                                                 *               	type==0 : 出现错误
                                                 *               	type==3 : 滚动每个格子的回调
												 *     回调内容      data = {}
                                                 */
                                                
    };

    this.version = typeof __VERSION__ == 'undefined' ? opt.version : __VERSION__;

    Lottery = this;

    Lottery.options = extend(options,opt);

    Lottery.init();
}

/*
 * 初始化Jslottery所需要的基本参数和信息
 */
Jslottery.prototype.init = function () {

    const self = Lottery.options;

    //判断必要的参数
    if ( self.scrollDom == null || self.scrollId == null ){
        LotteryError = true;
        self.callback(0,{
            msg:"dom选择器或者dom属性id号不能为空"
        });
    }

    LotteryInitSpeed = self.speed

    const LotteryDom = scrollDom(self.scrollDom,self.scrollId);

    domNumber = LotteryDom.domNumber

    self.scrollDom = LotteryDom.dom
}

/**
 * 开始滚动
 */
Jslottery.prototype.start = function () {

    const self = Lottery.options;

    //遇到错误  或者 当前已经开始滚动 则 不会进行开始
    if(LotteryError){
        return false;
    }

    if(LotteryCircleStep !=0 ) {
        self.callback(0,{
            msg:"当前正在滚动，请等待滚动停止"
        });
        return false;
    }
    
    Lottery.scroll();
    
}

Jslottery.prototype.scroll = function () {

    const self = Lottery.options;

    if(!LotteryFinish){
        //开始滚动
        LotteryFinish=true;
        self.callback(1);
    }
    
    if(LotteryTimeout){
        //恢复初始化参数   
        LotteryCircle=0;
        LotteryCircleStep=0;
        self.speed = LotteryInitSpeed;
        LotteryTimeout = false;			
        LotteryFinish= false;
        self.callback(2);
        return false;
    }


    Lottery.changeNext();
    setTimeout(Lottery.scroll,self.speed);
}

/**
 * 加快速度
 */
Jslottery.prototype.speedUp = function () {
    const self = Lottery.options
    if(LotteryCircleStep == self.speedUpPosition)
        self.speed = self.speedUp;
}

/**
 * 减缓速度
 */
Jslottery.prototype.speedDown = function () {
    const self = Lottery.options;

    var tmp1 = self.stopPosition-self.speedDownPosition;
    var tmp2 = self.totalCircle+1;
    if(tmp1<=0){
        tmp1 = domNumber + tmp1;
        tmp2 = tmp2-1;
    }

    if(self.startPosition==tmp1 && LotteryCircle==tmp2)
        self.speed = self.speedDown;
}

/**
 * 滚动的依次改变的效果
 */
Jslottery.prototype.changeNext = function () {
    var self = Lottery.options;

    LotteryCircleStep++;

    if(self.totalCircle==0 && self.startPosition==self.stopPosition){
        LotteryTimeout = true
    }
    
    if(self.startPosition==domNumber+1){
        self.startPosition=1;
        LotteryCircle++;
    }

    if(LotteryCircle==self.totalCircle+1 && self.startPosition==self.stopPosition){
        LotteryTimeout = true;
    }

    //速度变化
    Lottery.speedUp();

    Lottery.speedDown();

    //滚动的信息回调
    self.callback(3,{
        id:self.startPosition,
        speed:self.speed,
        totalStep:LotteryCircleStep
    });

    //开始实现滚动
    Lottery.start_scroll();
}

/**
 * 实现滚动的核心逻辑
 */
Jslottery.prototype.start_scroll = function () {
    var self = Lottery.options;

    for(var i=1;i<=domNumber;i++){

        if(self.scrollDom[i].getAttribute(self.scrollId)==self.startPosition)
        {
            changeDomActive(self.scrollDom[i]);
  
            for(var j=1;j<=domNumber;j++){
                if(self.startPosition==1)
                {
                    for(var k=1;k<=domNumber;k++){
                        if(self.scrollDom[k].getAttribute(self.scrollId)==domNumber){
                            changeDomActive(self.scrollDom[k],true);
                        }
                    }
                }else if(self.scrollDom[j].getAttribute(self.scrollId)==self.startPosition-1)
                {
                    changeDomActive(self.scrollDom[j],true);
                }
            }

            self.startPosition++;
            return false;
        }
    }
}

function createJslottery(opt) {
	return new Jslottery(opt);
}

module.exports = createJslottery;