function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

const scryfallQuery = {
    splitArr(desiredLength, arrToSplit) {
        let splitArrs = [];
        while (arrToSplit.length > 0) {
            let tempArr = [];
            for (let i = desiredLength; i > 0 && arrToSplit.length > 0; i--) {
                tempArr.push(arrToSplit.pop())
            }
            splitArrs.push(tempArr)
        }
        return splitArrs;
    },

    async autoComplete(string) {
        let query = `https://api.scryfall.com/cards/autocomplete?q=${string}`
        let data = await fetch(query).then(res => res.json()).then(data => data.data)
        return data
    },

    async getMany(cardsArr) {
        cardsArr = scryfallQuery.splitArr(75, cardsArr);
        let scryfallCardsArr = [];
        async function queryChunk() {
            if (cardsArr.length !== 0) {
                let chunkToQuery = cardsArr.pop();
                let query = `https://api.scryfall.com/cards/collection`;
                await fetch(query, {
                    method: "POST",
                    body: JSON.stringify({ identifiers: chunkToQuery }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(res => res.json())
                    .then((data) => {
                        scryfallCardsArr.push(data.data);
                        pausecomp(100)
                        return queryChunk();
                    })
                return;
            };
        };
        await queryChunk()
        return scryfallCardsArr;
    },

    async scryFallSyntaxSearch(string) {
        let query = `https://api.scryfall.com/cards/search?q=${string}`;
        let data = await fetch(query).then(res => res.json()).then(data => data.data)
        return data;
    },
};