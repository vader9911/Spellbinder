function splitArr(desiredLength, arrToSplit){
    let splitArrs = [];
    while (cardsArr.length >0){
        let tempArr = [];
        for (let i = desiredLength; i > 0 && cardsArr.length > 0 ; i--){
            tempArr.push(cardsArr.pop())
        }
        splitArrs.push(tempArr)
    }
    return splitArrs;
}

module.exports = {splitArr};