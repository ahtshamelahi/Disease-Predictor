function showResults(data) {
    const box = document.querySelector(".question-flow");

    if (data.error) {
        box.innerHTML = `
            <div class="error-state">
                <h2>⚠ Error</h2>
                <p>${data.error}</p>
                <button onclick="location.reload()">Try Again</button>
            </div>`;
        return;
    }

    box.innerHTML = `
        <div class="result-container">
            <h2>🧠 AI Prediction Result</h2>

            <div class="card highlight">
                <h3>Prediction</h3>
                <p class="${data.prediction === 'Positive' ? 'positive' : 'negative'}">
                    ${data.prediction ?? "Unknown"}
                </p>
            </div>

            <div class="card">
                <h3>Risk Score</h3>
                <p>${data.risk_score ?? "N/A"}</p>
            </div>

            <div class="card">
                <h3>Medicines</h3>
                <ul>${(data.medicines || []).map(m => `<li>${m}</li>`).join("")}</ul>
            </div>

            <div class="card warning">
                <h3>Warnings</h3>
                <ul>${(data.warnings || []).map(w => `<li>${w}</li>`).join("")}</ul>
            </div>

            <div class="card tips">
                <h3>Health Tips</h3>
                <ul>${(data.tips || []).map(t => `<li>${t}</li>`).join("")}</ul>
            </div>

            <p class="disclaimer">${data.disclaimer ?? ""}</p>

            <button class="restart-btn" onclick="location.reload()">Test Another Disease</button>
        </div>`;
}