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

function getJslotteryDom (dom,scrollDom,scrollId) {
    const LotteryDom =  document.getElementById(dom)==null ? 
                        document.getElementsByClassName(dom) : 
                        document.getElementById(dom);
    
    const LotteryLength = LotteryDom.length;

    let scrollDomList = [];

    for(var i=0;i<=LotteryLength;i++){
        for(var j=0;j<LotteryLength;j++){
            if(LotteryDom[j].getAttribute(scrollId) == i){
                scrollDomList[i] = getscrollDomStyle(LotteryDom[j],scrollDom);
            }
        }
    }

    return {
        "dom":LotteryDom,
        "domNumber":LotteryLength,
        "domList":scrollDomList
    }

}

module.exports = getJslotteryDom