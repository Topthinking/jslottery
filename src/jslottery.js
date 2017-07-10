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

let domNumber,
    LotteryTimeout = false,
    LotteryCircle = 0,
    LotteryCircleStep = 0,
    LotteryFinish = true,
    LotteryInitSpeed = null,
    LotteryError = false;

	
function Jslottery(opt){
    var options = {
        scrollDom:null,
        startPosition:null,
        stopPosition:null,
        speed:null,
        speedUp:null,
        speedDown:null,
        speedUpPosition:null,
        speedDownPosition:null,
        totalCircle:null,
        scrollId:null,
        callback:function(){}
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