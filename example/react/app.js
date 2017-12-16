import React from 'react'

import Jslottery from '../../src'

export default class App extends React.Component {

    start() { 
        this.lottery.options.stopPosition=Math.floor(Math.random()*1+11);		
        this.lottery.options.speed=Math.floor(Math.random()*200+300);
        this.lottery.options.speedUpPosition=Math.floor(Math.random()*6+1);
        this.lottery.options.speedDownPosition=Math.floor(Math.random()*6+1);
        this.lottery.options.speedUp=Math.floor(Math.random()*30+20);
        this.lottery.options.speedDown=Math.floor(Math.random()*100+600);
        this.lottery.options.totalCircle = Math.floor(Math.random() * 2 + 5);
        this.lottery.start();
    }

    componentDidMount() { 
        this.lottery = Jslottery({
            scrollDom:'prize-cell',
            scrollId:'data-id',		
            startPosition:1,
            callback:function(type,data){
                if(type==1){
                    //开始滚动
                    console.log("开始")
                }
        
                if(type==2){
                    //滚动完成
                    console.log("结束")
                }
        
                if(type==0){
                    //出现错误
                    console.log("错误")
                    console.log(data)
                }
        
                if(type==3){
                    //滚动每一个格子
                    console.log(data)
                }
            }
        })
    }

    render() {
        return (
            <div className="machine">
                <table className="machine-table">
                    <tbody>
                        <tr>
                            <td className="prize-cell" data-id="1" ></td>
                            <td className="prize-cell" data-id="2" ></td>
                            <td className="prize-cell" data-id="3" ></td>
                            <td className="prize-cell" data-id="4" ></td>
                        </tr>
                        <tr>
                            <td className="prize-cell" data-id="12" ></td>
                            <td className="machine-control-cell" colSpan="2" rowSpan="2">
                                <div className="machine-control" onClick={this.start.bind(this)}>
                                    <span>抽奖</span>
                                </div>
                            </td>
                            <td className="prize-cell" data-id="5" ></td>
                        </tr>
                        <tr>
                            <td className="prize-cell" data-id="11" ></td>
                            <td className="prize-cell" data-id="6" ></td>
                        </tr>
                        <tr>
                            <td className="prize-cell" data-id="10"></td>
                            <td className="prize-cell" data-id="9" ></td>
                            <td className="prize-cell" data-id="8" ></td>
                            <td className="prize-cell" data-id="7" ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}