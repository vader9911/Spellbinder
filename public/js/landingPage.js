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
    colDiv.classList.add("col-lg-2", "col-md-3", "col-sm-4", "col-xs-6", "my-2", 'card-obj');

    const cardImage = document.createElement("img");
    cardImage.src = card.image_uris?.png;
    cardImage.alt = card.name;
    cardImage.classList.add("card-img");

    // Set custom data attributes
    cardImage.setAttribute("data-card-name", card.name);
    cardImage.setAttribute("data-card-rarity", card.rarity);
    cardImage.setAttribute("data-card-image", card.image_uris?.png);
    cardImage.setAttribute("data-card-uuid", card.id);
    cardImage.setAttribute("data-card-oracle-text", card.oracle_text);

    // Create "Add to Collection" button
    const addToCollectionButton = document.createElement("button");
    addToCollectionButton.textContent = "Add to Collection";
    addToCollectionButton.classList.add("btn", "btn-primary", "add-to-collection-btn");

    // Add click event listener to the button
    addToCollectionButton.addEventListener('click', function (event) {
        // Access data attributes
        const card_name = cardImage.getAttribute('data-card-name');
        const oracle_text = cardImage.getAttribute('data-card-oracle-text');
        const img_uri = cardImage.getAttribute('data-card-image');
        const scryfall_id = cardImage.getAttribute('data-card-uuid');
        const rarity = cardImage.getAttribute('data-card-rarity');

        // Send data to the backend 
        sendDataToBackend({ card_name, oracle_text, img_uri, scryfall_id, rarity });
    });

    colDiv.appendChild(cardImage);
    colDiv.appendChild(addToCollectionButton);

    return colDiv;
}

// Function to send data to the backend
function sendDataToBackend(data) {
    
   
    fetch('/api/cards/addtocollection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Data sent successfully:', responseData);
    })
    .catch(error => {
        console.error('Error sending data to the backend:', error);
    });
}


searchBtn.addEventListener("click", searchCard);
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchCard();
    }
});