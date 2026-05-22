def generate_recommendations(disease):

    if "Severe" in disease:
        return {
            "level": "High Risk",
            "action": "Immediate medical attention"
        }

    elif "Moderate" in disease:
        return {
            "level": "Medium Risk",
            "action": "Monitor symptoms"
        }

    else:
        return {
            "level": "Low Risk",
            "action": "Maintain healthy lifestyle"
        }