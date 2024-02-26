let allCardsInCollection = document.querySelectorAll("[data-card-scryfall-id]");

allCardsInCollection.forEach((node)=>{
    let parent = node;
    let scryfallId = node.dataset.cardScryfallId;
    let removeFromCollectionBtn = node.children[3]
    removeFromCollectionBtn.addEventListener("click", (event)=>{
        
        fetch('/api/cards/removeFromCollection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({scryfall_id: scryfallId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return ;
        })
        .then(responseData => {
            parent.remove();
        })
        .catch(error => {
            console.error('Error sending data to the backend:', error);
        });
    })
})