document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".disease-card");

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value) ? "block" : "none";
        });
    });
});