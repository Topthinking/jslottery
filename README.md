jslottery
=========

[![npm](https://img.shields.io/npm/v/jslottery.svg?style=flat-square)](https://www.npmjs.com/package/jslottery)

[例子在这里](http://topthinking.github.io/demos/jslottery/)


## Usage

### npm 安装

```
$ npm install jslottery
```

### 示例

#### HTML

```html
<div class="machine">
	<table class="machine-table">
	      <tbody>
	      <tr>
	       <td class="prize-cell" data-id="1" ></td>
	       <td class="prize-cell" data-id="2" ></td>
	       <td class="prize-cell" data-id="3" ></td>
	       <td class="prize-cell" data-id="4" ></td>
	      </tr>
	      <tr>
	       <td class="prize-cell" data-id="12" ></td>	        			        	
	       <td class="machine-control-cell" colspan="2" rowspan="2">
	       <div class="machine-control" onclick="ClickMe(event)">
	       <span>抽奖</span>
	       </div>
	       </td>	        			 	        			
	       <td class="prize-cell" data-id="5" ></td>      			
	       </tr>
	      <tr>
	       <td class="prize-cell" data-id="11" ></td>
	       <td class="prize-cell" data-id="6" ></td>
	      </tr>
	      <tr>
	       <td class="prize-cell" data-id="10"></td>
	       <td class="prize-cell" data-id="9" ></td>
	       <td class="prize-cell" data-id="8" ></td>
	       <td class="prize-cell" data-id="7" ></td>
	      </tr>
	      </tbody>
	</table>
</div>
```

#### CSS

```css
.machine{
	margin: 0px auto;
	width:280px;
}
.prize-cell{
	background-color: #cb1573;
	width: 64px;
	height: 66px;
	position: relative;
}
.prize-cell.active{
	background-color: #ffff7e;
}
.prize-cell::after{
	background:rgba(0,0,0,0.2) none repeat scroll 0% 0%;
	content: "";
	bottom: 0px;
	left: 0;
	right: 0;
	height: 5px;
	position: absolute;
}
.machine-control-cell{			
	background-color: #278EF2;
}
.machine-control{
	width: 92px;
	height: 96px;
	position: absolute;
	margin: -44px 0px 0px 20px;
	border-radius: 42%;
	border: 1px solid #ff0;
	cursor: pointer;
}
.machine-control span{
	font-size: 30px;
	float: left;
	margin: 28px 0px 0px 16px;
}
```

#### JavaScript

``` javascript
'use strict'

Jslottery = require('jslottery')


var lottery = Jslottery({
		scrollDom:'prize-cell',
		scrollId:'data-id',		
		startPosition:1,
		callback:function(data){
           
        }
	});

function ClickMe(){
	lottery.options.stopPosition=Math.floor(Math.random()*1+11);		
	lottery.options.speed=Math.floor(Math.random()*200+300);
	lottery.options.speedUpPosition=Math.floor(Math.random()*6+1);
	lottery.options.speedDownPosition=Math.floor(Math.random()*6+1);
	lottery.options.speedUp=Math.floor(Math.random()*30+20);
	lottery.options.speedDown=Math.floor(Math.random()*100+600);
	lottery.options.totalCircle=Math.floor(Math.random()*2+5);
	lottery.start();
}

```

## 如何构建
jslottery的源码是基于webpack构建的

首先，clone项目源码
```bash
git clone https://github.com/Topthinking/Jslottery.git
```

安装依赖
```bash
cd Jslottery
npm install
```
测试demo页

```bash
npm run dev
```
打开浏览器访问如下地址, 查看效果

> localhost:9090
