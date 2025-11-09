const back_base_addr = "https://organic-space-invention-4wvpj6q95q7hqwgw-8000.app.github.dev/";
window.onload = () => {
    const itemId = 1;
    fetch(`${back_base_addr}reviews/${itemId}`)
        .then(response => response.json())
        .then(data => {
        console.log("Raw JSON response for item 1:", data);
        // Display the data on the webpage
        document.body.textContent = JSON.stringify(data, null, 2);
    })
        .catch(error => console.error("Error fetching item:", error));
};
//# sourceMappingURL=test.js.map