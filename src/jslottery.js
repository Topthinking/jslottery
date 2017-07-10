'use strict';

var scrollDom = require('./dom')

var global;

function extend(destination,source){
    for (var property in source)
            destination[property] = source[property];
    return destination;
}

var fixs = {
    timeout:false,
    original_speed:null,
    num:null,
    curC:0,
    steps:0,
    run:1,
    error:false,
    dom_style:{}
};
	
function Jslottery(opt){
    var options = {
        scroll_dom:null,
        start_position:null,
        stop_position:null,
        speed:null,
        speedUp:null,
        speedDown:null,
        speed_up_position:null,
        speed_down_position:null,
        total_circle:null,
        scroll_dom_css_value:null,
        scroll_dom_attr:null,
        scroll_dom_css:null,
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

    var LotteryDom = scrollDom(self.scroll_dom,self.scroll_dom_css,self.scroll_dom_attr);

    self.scroll_dom = LotteryDom.dom
    fixs.dom_style = LotteryDom.domList
    fixs.num = LotteryDom.domNumber
}

Jslottery.prototype.judge_null = function () {
    var self = global.options;
    if(self.scroll_dom==null || 
        self.scroll_dom_attr==null || 
        self.scroll_dom_css==null || 
        self.scroll_dom_css_value==null){
        fixs.error=true;
        self.callback({'status':'-1','data':'param error'});
    }
}

Jslottery.prototype.start = function () {
    if(fixs.error){
        global.options.callback({'status':'-1','data':'param error'});
        return false;
    }
    if(fixs.run)
        global.options.callback({'status':'0','data':'Jslottery will start running'});
    fixs.run=0;
    if(fixs.timeout){   
        fixs.curC=0;
        fixs.steps=0;
        global.options.speed = fixs.original_speed;
        fixs.timeout = false;			
        global.stop();
        clearTimeout(global.start);
        return false;
    }
    global.changeNext();
    setTimeout(global.start,global.options.speed);
}

Jslottery.prototype.stop = function () {
    global.options.callback({'status':'1','data':global});
    fixs.run=1;
}

Jslottery.prototype.speedUp = function () {
    if(fixs.steps==global.options.speed_up_position)
        global.options.speed = global.options.speedUp;
}

Jslottery.prototype.speedDown = function () {
    var tmp1 = global.options.stop_position-global.options.speed_down_position;
    var tmp2 = global.options.total_circle+1;
    if(tmp1<=0){
        tmp1 = fixs.num + tmp1;
        tmp2 = tmp2-1;
    }

    if(global.options.start_position==tmp1 && fixs.curC==tmp2)
        global.options.speed = global.options.speedDown;
}

Jslottery.prototype.changeNext = function () {
    var self = global.options;
    fixs.steps++;
    
    if(global.options.start_position==fixs.num+1){
        global.options.start_position=1;
        fixs.curC++;
    }

    global.speedUp();

    global.speedDown();

    if(global.options.start_position==self.stop_position && fixs.curC==self.total_circle+1){
        fixs.timeout = true;
    }

    global.start_scroll();
}

Jslottery.prototype.start_scroll = function () {
    var self = global.options, fix = fixs, scroll_json = {}, original_json = {};

    scroll_json[self.scroll_dom_css] = self.scroll_dom_css_value;

    for(var i=0;i<=fixs.num;i++){

        if(self.scroll_dom[i].getAttribute(self.scroll_dom_attr)==self.start_position)
        {

            original_json[self.scroll_dom_css] = self.start_position==1 ? fix.dom_style[fix.num] : fix.dom_style[self.start_position-1];
            self.scroll_dom[i].style.cssText=self.scroll_dom_css+":"+scroll_json[self.scroll_dom_css];
            
            for(var j=0;j<fix.num;j++){
                if(self.start_position==1)
                {
                    for(var k=0;k<fix.num;k++){
                        if(self.scroll_dom[k].getAttribute(self.scroll_dom_attr)==fix.num){
                            self.scroll_dom[k].style.cssText=self.scroll_dom_css+":"+original_json[self.scroll_dom_css];
                        }
                    }
                }else if(self.scroll_dom[j].getAttribute(self.scroll_dom_attr)==self.start_position-1)
                {
                    self.scroll_dom[j].style.cssText=self.scroll_dom_css+":"+original_json[self.scroll_dom_css];
                }
            }

            self.start_position++;
            return false;
        }
    }
}

function createJslottery(opt) {
	return new Jslottery(opt);
}


createJslottery.prototype.version = __VERSION__;

module.exports = createJslottery;