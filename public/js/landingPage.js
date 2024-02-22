const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");

function searchCard(){
    let searchText =  searchBar.value;
    console.log(scryfallQuery.scryFallSyntaxSearch(searchText))
}

searchBtn.addEventListener("click", searchCard)