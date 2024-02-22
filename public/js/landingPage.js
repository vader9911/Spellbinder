const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");

async function searchCard(){
    let searchText =  searchBar.value;
    const scryfallCards = await scryfallQuery.scryFallSyntaxSearch(searchText)
    console.log(scryfallCards)
    return scryfallCards;
};

searchBtn.addEventListener("click", searchCard);