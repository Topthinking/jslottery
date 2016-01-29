JS抽奖类库(原生的Js代码)<br/>
---------------------------
@author Topthinking

###1.参数说明
global 对象全局this<br/>
curC  当前转的总圈数<br/>
num  每一圈的总元素个数<br/>
steps 每次点击抽奖实时转动的步数<br/>
run 每次执行的标识码<br/>


###2.调用(下面显示的都是必填项)
```Javascript
new Jslottery({
	scroll_dom:'', //用来滚动的dom元素
	scroll_dom_css:'',//每次滚动需要改变的元素属性名称 如 background-color、border...
	scroll_dom_css_value:'',//滚动时需要改变的属性值 如 red、1px solid red...
	scroll_dom_attr:'',//滚动的元素上绑定的奖品id号 如 <div data_id="1"></div> 这里的data-id就是attr 这里的id数字必须是连续的正整数
	stop_position:0, //最终在哪个元素处停止
	start_position:1,//元素第一次开始的位置，以后 不需要再赋值了
	callback:function(data){
		//这里进行回调函数的处理
		switch(data.status){
			case '-1': //异常处理
			break;
			case '0'://滚动开始
			break;
			case '1'://滚动结束
			break;
		}
	}
});
