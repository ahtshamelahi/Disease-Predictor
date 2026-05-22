async function sendAnswers(disease, answers) {
    const response = await fetch(`https://mediscanai-nvdx.onrender.com/api/predict/${disease}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
    });
    if (!response.ok) throw new Error("API request failed");
    return await response.json();
}
