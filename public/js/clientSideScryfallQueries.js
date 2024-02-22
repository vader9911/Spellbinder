/** @module scryfallQuery */
const scryfallQuery = {
    /**
     * Takes an array, then returns an matrix in which each col is a max length of desired length
     * @param {number} desiredLength maximum size for the sub arrays
     * @param {Array} arrToSplit array being processed
     * @returns {Array}
     */
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

    /**
     * Hits scryfall's autocomplete endpoint.
     * @param {string} subString Any valid substring for any card
     * @returns {array} Array of all magic card names that contain the substring
     */
    async autoComplete(subString) {
        let query = `https://api.scryfall.com/cards/autocomplete?q=${subString}`
        let data = await fetch(query).then(res => res.json()).then(data => data.data)
        return data
    },

    /**
     * Hits scryfall's collection endpoint to query many cards at once
     * @param {Array} cardsArr An array of scryfall UUID's
     * @returns {Array} An array of up to date, scryfall card objects
     */
    async getMany(cardsArr) {
        cardsArr = scryfallQuery.splitArr(75, cardsArr);
        let scryfallCardsArr = [];
        async function queryChunk() {
            if (cardsArr.length !== 0) {
                let chunkToQuery = cardsArr.pop();
                chunkToQuery = chunkToQuery.map((uuid)=> {return{id: uuid}})
                let query = `https://api.scryfall.com/cards/collection`;
                await fetch(query, {
                    method: "POST",
                    body: JSON.stringify({ identifiers: chunkToQuery }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(res => res.json())
                    .then(async (data) => {
                        scryfallCardsArr.push(data.data);
                        await new Promise(r => setTimeout(r, 100));
                        return queryChunk();
                    })
                return;
            };
        };
        await queryChunk()
        return scryfallCardsArr.flat();
    },

    /**
     * Hits scryfall's search endpoint which allows scryfall syntax.
     * Unlike autocomplete, this returns scryfall card objects
     * @param {String} string 
     * @returns {Array} Array of up-to-date string objects
     */
    async scryFallSyntaxSearch(string) {
        let query = `https://api.scryfall.com/cards/search?q=${string}`;
        let data = await fetch(query).then(res => res.json()).then(data => data.data)
        return data;
    },
};