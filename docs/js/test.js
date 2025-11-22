const back_base_addr = "https://organic-space-invention-4wvpj6q95q7hqwgw-8000.app.github.dev/";
window.onload = async () => {
    // Data for the new game.
    // Assumes a developer with ID 1 already exists in the database.
    const newGameData = {
        title: "Epic Quest Saga",
        platforms: "PC, PlayStation 5, Xbox Series X",
        description: "An expansive open-world RPG with a rich story.",
        release_date: "2025-10-26",
        developer: 1
    };
    try {
        // 1. Create a new game
        const gameResponse = await fetch(`${back_base_addr}games/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGameData),
        });
        if (!gameResponse.ok) {
            const errorData = await gameResponse.json();
            throw new Error(`Failed to create game: ${JSON.stringify(errorData)}`);
        }
        const createdGame = await gameResponse.json();
        console.log("Game created successfully:", createdGame);
        // Data for the new review, using the ID of the game just created.
        // Assumes a user with ID 1 already exists.
        const newReviewData = {
            user: 1,
            game: createdGame.id, // Use the ID from the newly created game
            rating: 5,
            comment: "This game is amazing, a must-play!"
        };
        // 2. Add a new review for the created game
        const addResponse = await fetch(`${back_base_addr}reviews/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReviewData),
        });
        if (!addResponse.ok) {
            const errorData = await addResponse.json();
            throw new Error(`Failed to add review: ${JSON.stringify(errorData)}`);
        }
        const createdReview = await addResponse.json();
        console.log("Review created successfully:", createdReview);
        // 3. Get the newly created review by its ID and display it
        const reviewId = createdReview.id;
        const getResponse = await fetch(`${back_base_addr}reviews/${reviewId}`);
        const fetchedReview = await getResponse.json();
        console.log(`Raw JSON response for item ${reviewId}:`, fetchedReview);
        document.body.textContent = JSON.stringify(fetchedReview, null, 2);
    }
    catch (error) {
        console.error("An error occurred:", error);
        document.body.textContent = `An error occurred: ${error.message}`;
    }
};
//# sourceMappingURL=test.js.map