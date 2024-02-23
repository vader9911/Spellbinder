const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");


async function searchCard(){
    let searchText =  searchBar.value;
    const scryfallCards = await scryfallQuery.scryFallSyntaxSearch(searchText)
    console.log(scryfallCards)
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
    // Create card elements dynamically using the provided template
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("container-fluid", "p-4", "mx-auto");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "mx-3");

    const colDiv = document.createElement("div");
    colDiv.classList.add("col-2", "my-4");

    const cardImage = document.createElement("img");
    cardImage.src = card.imageUri; // Adjust this based on the actual property in your card object
    cardImage.alt = card.name;
    cardImage.classList.add("img-fluid");

    // Append elements to the card container
    colDiv.appendChild(cardImage);
    rowDiv.appendChild(colDiv);
    cardDiv.appendChild(rowDiv);

    return cardDiv;
}



searchBtn.addEventListener("click", searchCard);