def analyze_asthma(answers):

    score = 0

    if answers.get("shortness_breath") == "yes":
        score += 2

    if answers.get("wheezing") == "yes":
        score += 2

    if answers.get("night_cough") == "yes":
        score += 1

    if answers.get("exercise_trigger") == "yes":
        score += 2

    if answers.get("chest_tightness") == "yes":
        score += 2

    if answers.get("smoke_trigger") == "yes":
        score += 2

    if answers.get("inhaler_use") == "frequent":
        score += 2

    if answers.get("night_wakeup") == "yes":
        score += 2

    return score
    