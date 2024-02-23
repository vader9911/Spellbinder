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






// // demo card template  
// // todo add js to dynamically generate per card 
//   <div class="container-fluid  p-4 mx-auto">
//     <div class="row mx-3">

//       <div class="col-2 my-4">
//            <img src="https://cards.scryfall.io/png/front/e/0/e08ed414-77bf-402a-82a8-9d4e1bd627a1.png?1682204635" alt="Atraxa" class="img-fluid" >
//       </div>
  
//     </div> 
    
//   </div>


function createCardElement(card) {
    // const cardDiv = document.createElement("div");
    // cardDiv.classList.add("p-4", "mx-auto");

    // const rowDiv = document.createElement("div");
    // rowDiv.classList.add("row", "mx-3");

    const colDiv = document.createElement("div");
    colDiv.classList.add("col-lg-2","col-md-3","col-sm-4","col-xs-6", "my-2");

    const cardImage = document.createElement("img");
    cardImage.src = card.image_uris?.png; // Use image_uris.normal for the card image
    cardImage.alt = card.name;
    cardImage.classList.add("card-img");
    colDiv.appendChild(cardImage);
    

    return colDiv;
}


searchBtn.addEventListener("click", searchCard);