document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".disease-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});