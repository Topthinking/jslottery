'use strict'
 
/**
 * 
 * @param {*传入的dom对象} obj 
 * @param {*} scrollDom 
 */
function getscrollDomStyle(obj,scrollDom){
    if(obj.currentStyle){
        return obj.currentStyle[scrollDom];
    }else{
        return getComputedStyle(obj,false)[scrollDom];
    }
}

function getJslotteryDom (dom,scrollId) {
    const LotteryDom =  document.getElementById(dom)==null ? 
                        document.getElementsByClassName(dom) : 
                        document.getElementById(dom);
    
    const LotteryLength = LotteryDom.length;

    let scrollDomList = [];

    console.log(LotteryLength)

    //把获取到的dom对象绑定到对应的id号上
    for(var i=0;i<=LotteryLength;i++){
        for(var j=0;j<LotteryLength;j++){
            if(LotteryDom[j].getAttribute(scrollId) == i){
                scrollDomList[i] = LotteryDom[j];
            }
        }
    }

    return {
        "dom":scrollDomList,
        "domNumber":LotteryLength
    }

}

module.exports = getJslotteryDom