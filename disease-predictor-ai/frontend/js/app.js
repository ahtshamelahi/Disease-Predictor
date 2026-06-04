// app.js

// ── HANDLE GOOGLE OAUTH REDIRECT ──────────────────────────────────
(async () => {
    const sb = window.supabaseClient;
    if (!sb) return;

    // If Google OAuth redirect — URL contains #access_token
    if (window.location.hash && window.location.hash.includes("access_token")) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.history.replaceState(null, "", window.location.pathname);
        window.location.reload();
        return;
    }

    // ── NORMAL AUTH GUARD ──────────────────────────────────────────
    const { data } = await sb.auth.getSession();
    if (!data.session) {
        window.location.href = "login.html";
    }
})();

// ── MAIN APP ──────────────────────────────────────────────────────────────────
let currentIndex = 0;
let answers = {};
let currentDisease = null;

document.addEventListener("DOMContentLoaded", async () => {

    console.log("App Loaded");

    // ── ELEMENTS ──────────────────────────────────────────────────────────────
    const questionFlow = document.getElementById("questionFlow");
    const questionOverlay = document.getElementById("questionOverlay");
    const allCards = document.querySelectorAll(".disease-card");

    if (allCards.length === 0) {
        console.error("No disease cards found");
        return;
    }

    // ── OPEN / CLOSE OVERLAY ──────────────────────────────────────────────────
    function openOverlay() {
        questionOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeOverlay() {
        questionOverlay.classList.remove("open");
        document.body.style.overflow = "";
        allCards.forEach(c => c.classList.remove("active"));
        currentIndex = 0;
        answers = {};
        currentDisease = null;
        const label = document.getElementById("activeDiseaseLabel");
        if (label) label.textContent = "Screening";
    }

    // Close on backdrop click
    questionOverlay.addEventListener("click", (e) => {
        if (e.target === questionOverlay) closeOverlay();
    });

    // ── DISEASE CARDS ─────────────────────────────────────────────────────────
    allCards.forEach(card => {
        card.addEventListener("click", () => {
            const disease = card.getAttribute("data-disease");

            if (!window.DISEASE_QUESTIONS[disease]) {
                console.error("No questions for:", disease);
                return;
            }

            allCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // update label in modal header
            const label = document.getElementById("activeDiseaseLabel");
            const cardTitle = card.querySelector("h3");
            if (label && cardTitle) label.textContent = cardTitle.textContent;

            startTest(disease);
            openOverlay();
        });
    });

    // ── START TEST ────────────────────────────────────────────────────────────
    function startTest(disease) {
        currentDisease = disease;
        currentIndex = 0;
        answers = {};
        console.log("Starting:", disease);
        showQuestion();
    }

    // ── SHOW QUESTION ─────────────────────────────────────────────────────────
    function showQuestion() {
        const questions = window.DISEASE_QUESTIONS[currentDisease];
        if (!questions) { questionFlow.innerHTML = "<p>No questions found.</p>"; return; }
        if (currentIndex >= questions.length) { submitAnswers(); return; }

        const q = questions[currentIndex];
        const total = questions.length;
        const progress = Math.round((currentIndex / total) * 100);

        const progressHTML = `
            <div class="progress-bar-wrap">
                <div class="progress-bar" style="width:${progress}%"></div>
            </div>
            <span class="q-counter">${currentIndex + 1} / ${total}</span>
        `;

        if (q.type === "number") {
            questionFlow.innerHTML = `
                <div class="question-card">
                    ${progressHTML}
                    <h2>${q.question}</h2>
                    ${q.optional ? `<p class="optional-label">Optional — skip if you don't know</p>` : ""}
                    <div class="input-group">
                        <input type="number" id="numInput" placeholder="Enter value..." min="0" />
                        <button id="numSubmit">Next →</button>
                    </div>
                    ${q.optional ? `<button id="skipBtn" class="skip-btn" style="margin-top:10px;width:100%">Skip</button>` : ""}
                </div>`;
            document.getElementById("numSubmit").onclick = () => {
                const val = document.getElementById("numInput").value;
                handleAnswer(val !== "" ? parseFloat(val) : null);
            };
            document.getElementById("numInput").addEventListener("keydown", e => {
                if (e.key === "Enter") document.getElementById("numSubmit").click();
            });
            if (q.optional) document.getElementById("skipBtn").onclick = () => handleAnswer(null);

        } else if (q.type === "bmi") {
            questionFlow.innerHTML = `
                <div class="question-card">
                    ${progressHTML}
                    <h2>${q.question}</h2>
                    <p class="optional-label">Enter height &amp; weight — BMI calculated automatically</p>
                    <div class="bmi-group">
                        <input type="number" id="heightInput" placeholder="Height (cm)" min="50" max="250" />
                        <input type="number" id="weightInput" placeholder="Weight (kg)" min="10" max="300" />
                        <span id="bmiResult" class="bmi-result"></span>
                    </div>
                    <div class="btn-group">
                        <button id="bmiSubmit">Next →</button>
                        <button id="skipBtn" class="skip-btn">Skip</button>
                    </div>
                </div>`;
            const calcBMI = () => {
                const h = parseFloat(document.getElementById("heightInput").value) / 100;
                const w = parseFloat(document.getElementById("weightInput").value);
                if (h > 0 && w > 0)
                    document.getElementById("bmiResult").textContent = `BMI: ${(w / (h * h)).toFixed(1)}`;
            };
            document.getElementById("heightInput").oninput = calcBMI;
            document.getElementById("weightInput").oninput = calcBMI;
            document.getElementById("bmiSubmit").onclick = () => {
                const h = parseFloat(document.getElementById("heightInput").value) / 100;
                const w = parseFloat(document.getElementById("weightInput").value);
                handleAnswer((h > 0 && w > 0) ? parseFloat((w / (h * h)).toFixed(1)) : null);
            };
            document.getElementById("skipBtn").onclick = () => handleAnswer(null);

        } else if (q.type === "select") {
            questionFlow.innerHTML = `
                <div class="question-card">
                    ${progressHTML}
                    <h2>${q.question}</h2>
                    <div class="btn-group multi">
                        ${q.options.map(opt =>
                `<button class="option-btn" data-val="${opt}">${opt}</button>`
            ).join("")}
                    </div>
                </div>`;
            document.querySelectorAll(".option-btn").forEach(btn => {
                btn.onclick = () => handleAnswer(btn.getAttribute("data-val"));
            });

        } else if (q.optional) {
            questionFlow.innerHTML = `
                <div class="question-card">
                    ${progressHTML}
                    <h2>${q.question}</h2>
                    <p class="optional-label">Optional — skip if unknown</p>
                    <div class="btn-group">
                        <button id="yesBtn">Yes</button>
                        <button id="noBtn">No</button>
                        <button id="skipBtn" class="skip-btn">Skip</button>
                    </div>
                </div>`;
            document.getElementById("yesBtn").onclick = () => handleAnswer("yes");
            document.getElementById("noBtn").onclick = () => handleAnswer("no");
            document.getElementById("skipBtn").onclick = () => handleAnswer(null);

        } else {
            questionFlow.innerHTML = `
                <div class="question-card">
                    ${progressHTML}
                    <h2>${q.question}</h2>
                    <div class="btn-group">
                        <button id="yesBtn">Yes</button>
                        <button id="noBtn">No</button>
                    </div>
                </div>`;
            document.getElementById("yesBtn").onclick = () => handleAnswer("yes");
            document.getElementById("noBtn").onclick = () => handleAnswer("no");
        }
    }

    // ── HANDLE ANSWER ─────────────────────────────────────────────────────────
    function handleAnswer(value) {
        const q = window.DISEASE_QUESTIONS[currentDisease][currentIndex];
        answers[q.key] = value;
        currentIndex++;
        showQuestion();
    }

    // ── SUBMIT ────────────────────────────────────────────────────────────────
    async function submitAnswers() {
        questionFlow.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <h2>Analyzing your symptoms...</h2>
                <p>AI is processing your answers</p>
            </div>`;
        try {
            const data = await sendAnswers(currentDisease, answers);
            console.log("SERVER RESPONSE:", data);
            showResults(data);
        } catch (err) {
            console.error("Backend error:", err);
            questionFlow.innerHTML = `
                <div class="error-state">
                    <h2>Network Connection Problem</h2>
                    <p>Network Connection is not Stable</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>`;
        }
    }

    // ── SHOW RESULTS ──────────────────────────────────────────────────────────
    function showResults(data) {
        if (data.error) {
            questionFlow.innerHTML = `
                <div class="error-state">
                    <h2>⚠ Error</h2>
                    <p>${data.error}</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>`;
            return;
        }

        questionFlow.innerHTML = `
            <div class="result-container">
                <h2>Screening Result</h2>

                <div class="result-card highlight">
                    <h3>Prediction</h3>
                    <p class="prediction-label ${data.prediction === 'Positive' ? 'positive' : 'negative'}">
                        ${data.prediction ?? "Unknown"}
                    </p>
                </div>

                <div class="result-card">
                    <h3>Risk Level</h3>
                    <p>${data.risk_score ?? "N/A"}</p>
                </div>

                <div class="result-card">
                    <h3>Recommended Medicines</h3>
                    <ul>${(data.medicines || []).map(m => `<li>${m}</li>`).join("")}</ul>
                </div>

                <div class="result-card">
                    <h3>Warnings</h3>
                    <ul>${(data.warnings || []).map(w => `<li>${w}</li>`).join("")}</ul>
                </div>

                <div class="result-card">
                    <h3>Health Tips</h3>
                    <ul>${(data.tips || []).map(t => `<li>${t}</li>`).join("")}</ul>
                </div>

                <p class="disclaimer">${data.disclaimer ?? ""}</p>

                <button class="restart-btn" id="restartBtn">
                     Check Another Disease
                </button>
            </div>`;

        document.getElementById("restartBtn").onclick = () => {
            closeOverlay();
        };
    }

    // expose globally for predictions.js
    window.showResults = showResults;
});
