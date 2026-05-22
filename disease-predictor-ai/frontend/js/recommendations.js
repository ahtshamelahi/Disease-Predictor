function showRecommendations(data) {
    const section = document.querySelector(".recommendations-section");

    section.innerHTML = `
        <div class="recommendation-card">
            <h3>Medicines</h3>
            <ul>
                ${data.medicines.map(m => `<li>${m}</li>`).join("")}
            </ul>
        </div>

        <div class="recommendation-card">
            <h3>Health Tips</h3>
            <ul>
                ${data.tips.map(t => `<li>${t}</li>`).join("")}
            </ul>
        </div>
    `;
}