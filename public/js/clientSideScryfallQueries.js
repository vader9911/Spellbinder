
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

    autoComplete(string) {
        let query = `https://api.scryfall.com/cards/autocomplete?q=${string}`
        fetch(query).then(res => res.json()).then(data => data.data)
        
    },

    getMany(cardsArr) {
        cardsArr = scryfallQuery.splitArr(75, cardsArr);
        let scryfallCardsArr = [];
        function queryChunk() {
            if (cardsArr.length !== 0) {
                let chunkToQuery = cardsArr.pop();
                let query = `https://api.scryfall.com/cards/collection`;
                fetch(query, {
                    method: "POST",
                    body: JSON.stringify({ identifiers: chunkToQuery }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                    })
                    .then(res => res.json())
                    .then((data) => {
                        scryfallCardsArr.push(data.data);

                        return setTimeout(queryChunk, 100);
                    })
            };
            return;
        };
    },

    scryFallSyntaxSearch(string) {
        let query = `https://api.scryfall.com/cards/search?q=${string}`;
        fetch(query).then(res => res.json()).then(data => data.data)
    },
};




