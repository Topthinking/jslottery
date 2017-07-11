'use strict';

var scrollDom = require('./dom')

var global;

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
    LotteryTimeout = false,         //当前滚动定时器
    LotteryCircle = 0,              //当前滚动圈数
    LotteryCircleStep = 0,          //当前滚动总步数
    LotteryFinish = true,           //判断是否滚动完成
    LotteryInitSpeed = null,        //记录正常的滚动速度
    LotteryError = false;           //是否显示滚动错误

	
function Jslottery(opt = {}){
    var options = {
        scrollDom:null,                         //滚动显示的dom  这里是使用class名称
        startPosition:null,                     //开始位置
        stopPosition:null,                      //停止位置
        totalCircle:null,                       //滚动的圈数
        speed:null,                             //正常速度
        speedUp:null,                           //加速的时候速度
        speedDown:null,                         //减速的时候速度
        speedUpPosition:null,                   //加速点
        speedDownPosition:null,                 //减速点
        scrollId:null,                          //滚动的dom上的属性号，是用来标记滚动结束获得的id号对应的奖项
        callback:function(){}                   //滚动回调函数
    };

    this.options = extend(options,opt);

    this.init();
}

/*
 * 初始化Jslottery所需要的基本参数和信息
 */
Jslottery.prototype.init = function () {

    global = this;

    this.judge_null()

    var self = global.options;

    var LotteryDom = scrollDom(self.scrollDom,self.scrollId);

    self.scrollDom = LotteryDom.dom

    domNumber = LotteryDom.domNumber

    LotteryInitSpeed = self.speed
}

/**
 * 判断需要的参数是否全部传进来
 */
Jslottery.prototype.judge_null = function () {
    var self = global.options;
    if(self.scrollDom==null || 
        self.scrollId==null 
        ){
        LotteryError=true;
        self.callback({'status':'-1','data':'param error'});
    }
}

/**
 * 开始滚动
 */
Jslottery.prototype.start = function () {
    if(LotteryError){
        global.options.callback({'status':'-1','data':'param error'});
        return false;
    }
    if(LotteryFinish)
        global.options.callback({'status':'0','data':'Jslottery will start running'});
    LotteryFinish=false;
    if(LotteryTimeout){   
        LotteryCircle=0;
        LotteryCircleStep=0;
        global.options.speed = LotteryInitSpeed;
        LotteryTimeout = false;			
        global.stop();
        clearTimeout(global.start);
        return false;
    }
    global.changeNext();
    setTimeout(global.start,global.options.speed);
}

/**
 * 停止滚动
 */
Jslottery.prototype.stop = function () {
    global.options.callback({'status':'1','data':global});
    LotteryFinish=true;
}

/**
 * 加快速度
 */
Jslottery.prototype.speedUp = function () {
    if(LotteryCircleStep==global.options.speedUpPosition)
        global.options.speed = global.options.speedUp;
}

/**
 * 减缓速度
 */
Jslottery.prototype.speedDown = function () {
    var tmp1 = global.options.stopPosition-global.options.speedDownPosition;
    var tmp2 = global.options.totalCircle+1;
    if(tmp1<=0){
        tmp1 = domNumber + tmp1;
        tmp2 = tmp2-1;
    }

    if(global.options.startPosition==tmp1 && LotteryCircle==tmp2)
        global.options.speed = global.options.speedDown;
}

/**
 * 滚动的依次改变的效果
 */
Jslottery.prototype.changeNext = function () {
    var self = global.options;
    LotteryCircleStep++;

    if(self.totalCircle==0 && global.options.startPosition==self.stopPosition){
        LotteryTimeout = true
    }
    
    if(global.options.startPosition==domNumber+1){
        global.options.startPosition=1;
        LotteryCircle++;
    }

    global.speedUp();

    global.speedDown();

    if(global.options.startPosition==self.stopPosition && LotteryCircle==self.totalCircle+1){
        LotteryTimeout = true;
    }

    global.start_scroll();
}

/**
 * 实现滚动的核心逻辑
 */
Jslottery.prototype.start_scroll = function () {
    var self = global.options;

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


createJslottery.prototype.version = __VERSION__;

module.exports = createJslottery;