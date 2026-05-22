async function sendAnswers(disease, answers) {
    const response = await fetch(`http://127.0.0.1:5000/api/predict/${disease}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
    });
    if (!response.ok) throw new Error("API request failed");
    return await response.json();
}