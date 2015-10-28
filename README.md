JS抽奖类库(依赖于juqery库)
@author Topthinking


1.参数说明
global 对象全局this
curL  当前滚动元素的位置(标志位)
curC  当前转的总圈数
num  每一圈的总元素个数
steps 每次点击抽奖实时转动的步数


2.调用(下面显示的都是必填项)

new Jslottery({
	scroll_dom:'', //用来滚动的dom元素(必填)
	id:0, //最终在哪个元素处停止(必填)
	scroll_value:'',//滚动元素的属性值(必填)
	attr_id:'',//滚动元素上绑定的奖品号的属性名称,(必填)
	change_mode:'',//元素属性名称(必填)
	callback:function(data){
		//这里进行回调函数的处理
		switch(data.status){
				case '0': //点击抽奖接口
					
				break;

				case '1': //抽奖程序结束
					console.log(data.data);
				break;

				default:
				break;
			}
	} //回调函数(必填)
});
