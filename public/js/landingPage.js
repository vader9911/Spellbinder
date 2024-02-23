const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const cardContainer = document.querySelector("#card-container");

async function searchCard(){
    let searchText =  searchBar.value;
    const scryfallCards = await scryfallQuery.scryFallSyntaxSearch(searchText)
    console.log(scryfallCards)

    cardContainer.innerHTML = "";

    scryfallCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardContainer.appendChild(cardElement);
    });
    return scryfallCards;
};



function createCardElement(card) {

    const colDiv = document.createElement("div");
    colDiv.classList.add("col-lg-2","col-md-3","col-sm-4","col-xs-6", "my-2", 'card-obj');

    const cardImage = document.createElement("img");
    cardImage.src = card.image_uris?.png; // Use image_uris.normal for the card image
    cardImage.alt = card.name;
    cardImage.classList.add("card-img");

    // Set custom data attributes

    cardImage.setAttribute("data-card-name", card.name);
    cardImage.setAttribute("data-card-image", card.image_uris?.png);
    cardImage.setAttribute("data-card-uuid", card.id);
    cardImage.setAttribute("data-card-oracle-text", card.oracle_text);
    cardImage.setAttribute("data-card-price-usd", card.prices.usd);


    colDiv.appendChild(cardImage);
    


    return colDiv;
}



document.addEventListener('click', function(event) {
    // Check if the clicked element is a card
    if (event.target.classList.contains('card-img') || event.target.classList.contains('card-obj')) {
        // Access data attributes
        const card_name = event.target.getAttribute('data-card-name');
        const oracle_text = event.target.getAttribute('data-card-oracle-text');
        const img_uri = event.target.getAttribute('data-card-image');
        const scryfall_id = event.target.getAttribute('data-card-uuid');
        // const card_price = event.target.getAttribute('data-card-price-usd');

        
        console.log(card_name, img_uri, scryfall_id, oracle_text);  
    }
});



searchBtn.addEventListener("click", searchCard);
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchCard();
    }
});