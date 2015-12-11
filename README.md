JS抽奖类库(依赖于juqery库)<br/>
@author Topthinking


###1.参数说明
global 对象全局this<br/>
curL  当前滚动元素的位置(标志位)<br/>
curC  当前转的总圈数<br/>
num  每一圈的总元素个数<br/>
steps 每次点击抽奖实时转动的步数<br/>


###2.调用(下面显示的都是必填项)
```Javascript
new Jslottery({
	scroll_dom:'', //用来滚动的dom元素(必填)
	change_mode:'',//每次滚动需要改变的元素属性名称(必填) 如 background-color、border...
	scroll_value:'',//滚动时需要改变的属性值(必填) 如 red、1px solid red...
	attr_id:'',//滚动的元素上绑定的奖品id号,(必填) 如 <div data_id="1"></div> 这里的data-id就是attr
	id:0, //最终在哪个元素处停止(必填)
	callback:function(data){
		//这里进行回调函数的处理
		if(data.status==1)//这里是抽奖滚动停止时回调函数
		{
			console.log(data.data);
		}
	} //回调函数(必填)
});