/*
 * @title Jslottery
 * @dependent Jquery
 * @author Topthinking
 */
 var Jslottery = (function(){

	var global,curL=1,curC=0,num,steps=0,run=1;
	
	function Jslottery(opt){
		this.options = $.extend({
			scroll_dom:null,
			stop_position:null,
			speed:300,
			speedUp:50,
			speedDown:400,
			speed_up_position:3,
			speed_down_position:2,
			total_circle:1,
			scroll_dom_css_value:null,
			scroll_dom_attr:null,
			scroll_dom_css:null,
			callback:function(){}
		},opt || {});

		
		this.fixs = {
			timeout:false,
			original_speed:null,
			dom_style:{}
		};

		this.init();
	}

	Jslottery.prototype = {
		init:function(){
			global = this;
			global.judge_Null();
			num = $(global.options.scroll_dom).length;	
			global.fixs.original_speed = global.options.speed;
			global.domstyle();
		},

		judge_Null:function(){
			if(global.options.scroll_dom==null || 
			   global.options.scroll_dom_attr==null || 
			   global.options.scroll_dom_css==null || 
			   global.options.scroll_dom_css_value==null ||
			   global.options.stop_position==null){
				global.options.callback({'status':'-1','data':'param error'});
			}
		},

		domstyle:function(){
			var self = global.options,i=1;
			$(self.scroll_dom).each(function(){
				$(self.scroll_dom).each(function(){
					if($(this).attr(self.scroll_dom_attr) == i){
						global.fixs.dom_style[i] = $(this).css(self.scroll_dom_css);
						i++;
					}
				});
			});
		},

		start:function(){
			if(run)
				global.options.callback({'status':'0','data':'Jslottery will start running'});
			run=0;
			if(global.fixs.timeout){   
				curC=0;
				steps=0;
				global.options.speed = global.fixs.original_speed;
				global.fixs.timeout = false;			
				global.stop();
				clearTimeout(global.start);
				return false;
			}
			global.changeNext();
			setTimeout(global.start,global.options.speed);
		},

		stop:function(){
			global.options.callback({'status':'1','data':global});
			run=1;
		},

		speedUp:function(){
			if(steps==global.options.speed_up_position)
				global.options.speed = global.options.speedUp;
		},

		speedDown:function(){
			var tmp1 = global.options.stop_position-global.options.speed_down_position;
			var tmp2 = global.options.total_circle+1;
			if(tmp1<=0){
				tmp1 = num + tmp1;
				tmp2 = tmp2-1;
			}

			if(curL==tmp1 && curC==tmp2)
				global.options.speed = global.options.speedDown;
		},

		changeNext:function(){

			var self = global.options;
			steps++;
			
			if(curL==num+1){
				curL=1;
				curC++;
			}

			global.speedUp();

			global.speedDown();

			if(curL==self.stop_position && curC==self.total_circle+1){
				global.fixs.timeout = true;
			}

			global.start_scroll();
		},

		start_scroll:function(){
			var self = global.options,scroll_json = {},original_json = {};

			scroll_json[self.scroll_dom_css] = self.scroll_dom_css_value;

			$(self.scroll_dom).each(function(){				
				if($(this).attr(self.scroll_dom_attr) == curL){	
					original_json[self.scroll_dom_css] = curL==1 ? global.fixs.dom_style[$(self.scroll_dom).length] : global.fixs.dom_style[curL-1];
					$(this).css(scroll_json);				
					$(self.scroll_dom).each(function(){
						if(curL==1){
							$(self.scroll_dom).each(function(){
								if($(this).attr(self.scroll_dom_attr) == num){
									$(this).css(original_json);
								}
							});
						}
						else if($(this).attr(self.scroll_dom_attr) == curL-1){
							$(this).css(original_json);
						}
					});
					curL++;
					return false;
				}
			});
		}
	};
	return Jslottery;
 })();