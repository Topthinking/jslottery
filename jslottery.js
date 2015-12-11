/*
 * js抽奖类库
 * @author Topthinking
 */
 var Jslottery = (function(){

	var global,curL=1,curC=0,num,steps=0;
	
	function Jslottery(opt){
		this.options = $.extend({
			scroll_dom:null, //用来滚动的dom元素(必填)
			id:null, //最终在哪个元素处停止(必填)
			speed:300,//转速(默认)
			speedUp:50,//加速度(默认)
			speedDown:400,//减速度(默认)
			speed_up:3,//加速处,相对于当前位置加(默认)
			speed_down:2,//减速处,相对于结束位置相减(默认)
			countC:1,//需要转的圈数(默认)一开始是第0圈的，需要完整的一圈
			scroll_value:null,//滚动元素的属性值(必填)
			attr_id:null,//滚动元素上绑定的奖品号的属性名称，例如：data-id="1"(必填)
			change_mode:null,//元素属性名称(必填)
			callback:function(){} //回调函数(必填)
		},opt || {});

		//固定不变的元素
		this.fixs = {
			cur_speed_up:'',//当前加速位置
			cur_speed_down:'',//当前的减速位置
			timeout:false,//用来关闭定时器的标识位
			original_speed:'',//初始传进来的速度
			dom_style:{}//获取滚动的dom元素每个的change_mode属性
		};

		this.init();
	}

	Jslottery.prototype = {
		init:function(){
			global = this;
			var self = global.options;
			var selfs = global.fixs;
			num = $(self.scroll_dom).length;	
			selfs.original_speed = self.speed;
			global.domstyle();
		},

		domstyle:function(){
			var self = global.options;
			var selfs = global.fixs;
			var i=1;
			$(self.scroll_dom).each(function(){
				$(self.scroll_dom).each(function(){
					if($(this).attr(self.attr_id) == i)
					{
						selfs.dom_style[i] = $(this).css(self.change_mode);
						i++;
					}
				});
			});
		},

		start:function(){
			var self = global.options;
			var selfs = global.fixs;
			var callback={'status':'0'}
			self.callback(callback);
			if(selfs.timeout)//这里是转盘结束
			{   
				curC=0;
				steps=0;
				global.options.speed = selfs.original_speed;
				selfs.timeout = false;			
				global.stop();
				clearTimeout(global.start);
				return false;
			}
			global.changeNext();
			setTimeout(global.start,self.speed);
		},

		//转盘停下后回调函数
		stop:function(){
			var self = global.options;
			var callback={'status':'1','data':global}
			global.options.callback(callback);
		},

		speedUp:function(){
			if(steps==global.options.speed_up)
			{
				global.options.speed = global.options.speedUp;
			}
		},

		speedDown:function(){
			var tmp1 = global.options.id-global.options.speed_down;
			var tmp2 = global.options.countC+1;
			if(tmp1<=0)
			{
				tmp1 = num + tmp1;
				tmp2 = tmp2-1;
			}

			if(curL==tmp1 && curC==tmp2)
			{
				global.options.speed = global.options.speedDown;
			}
		},

		changeNext:function(){

			var self = global.options;
			var selfs = global.fixs;
			steps++;
			
			if(curL==num+1)
			{
				curL=1;
				curC++;
			}

			//加速
			global.speedUp();

			//减速
			global.speedDown();

			if(curL==self.id && curC==self.countC+1) //这里表示转盘结束
			{
				selfs.timeout = true;
			}

			global.start_scroll();
		},

		start_scroll:function(){
			var self = global.options;
			var selfs = global.fixs;
			var scroll_json = {};
			var original_json = {};

			scroll_json[self.change_mode] = self.scroll_value;

			//遍历需要滚动的元素
			$(self.scroll_dom).each(function(){
				//根据每个元素的标识号来改变颜色				
				if($(this).attr(self.attr_id) == curL)
				{	
					if(curL==1)
					{					
						original_json[self.change_mode] = selfs.dom_style[$(self.scroll_dom).length];					
					}
					else
					{
						original_json[self.change_mode] = selfs.dom_style[curL-1];
					}
					$(this).css(scroll_json);				
					$(self.scroll_dom).each(function(){
						if(curL==1)
						{
							$(self.scroll_dom).each(function(){
								if($(this).attr(self.attr_id) == num)
								{
									$(this).css(original_json);
								}
							});
						}
						else if($(this).attr(self.attr_id) == curL-1)
						{
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
