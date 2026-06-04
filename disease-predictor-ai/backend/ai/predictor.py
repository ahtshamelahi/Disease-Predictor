import os
import joblib
import pandas as pd
from backend.ai.preprocess import preprocess_answers
from backend.ai.advice import get_advice

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "..", "models")

def load_model(disease_key):
    model_path   = os.path.join(MODELS_DIR, f"{disease_key}_model.pkl")
    feature_path = os.path.join(MODELS_DIR, f"{disease_key}_features.pkl")

    if not os.path.exists(model_path):
        return None, None

    model    = joblib.load(model_path)
    features = joblib.load(feature_path)
    return model, features


def predict_disease(disease_type, answers):

    model, features = load_model(disease_type)

    if model is None:
        return {"error": f"Model for '{disease_type}' is not trained yet. It will be available in coming updates."}

    input_data = preprocess_answers(disease_type, answers)

    df = pd.DataFrame([input_data])
    df = df.reindex(columns=features, fill_value=0)
    df = df.fillna(0).astype(float)

    prob          = model.predict_proba(df)[0]
    pos_prob      = round(float(prob[1]) * 100, 1)
    prediction    = "Positive" if pos_prob >= 50 else "Negative"

    if pos_prob >= 70:
        risk = "High Risk"
    elif pos_prob >= 40:
        risk = "Moderate Risk"
    else:
        risk = "Low Risk"

    advice = get_advice(disease_type, prediction, pos_prob, answers=answers)

    return {
        "prediction" : prediction,
        "risk_score" : f"{risk} ({pos_prob}%)",
        "medicines"  : advice["medicines"],
        "tips"       : advice["tips"],
        "warnings"   : advice["warnings"],
        "disclaimer" : "This is AI screening only. Always consult a qualified doctor."
    }
