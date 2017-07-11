'use strict'

function getJslotteryDom (dom,scrollId) {
    const LotteryDom =  document.getElementsByClassName(dom);
    
    const LotteryLength = LotteryDom.length;

    let scrollDomList = [];

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