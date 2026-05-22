import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "database", "dataset.csv")
SAVE_DIR  = os.path.join(BASE_DIR, "..", "models")

DISEASE_MAP = {
    "diabetes"      : "Type 2 Diabetes",
    "hypertension"  : "Hypertension",
    "hepatitis"     : "Hepatitis B & C",
    "tuberculosis"  : "Tuberculosis (TB)",
    "typhoid"       : "Typhoid Fever",
    "dengue"        : "Dengue Fever",
    "heart-disease" : "Heart Disease (CAD)",
    "malaria"       : "Malaria",
    "asthma"        : "Asthma / COPD",
    "kidney-disease": "Chronic Kidney Disease",
    "anemia"        : "Iron-Deficiency Anemia",
    "thyroid"       : "Thyroid Disorders",
    "cholera"       : "Cholera / Gastroenteritis",
    "breast-cancer" : "Breast Cancer",
    "pneumonia"     : "Pneumonia",
    "depression"    : "Depression / Anxiety",
    "skin-disease"  : "Skin Diseases",
    "uti"           : "Urinary Tract Infection",
    "obesity"       : "Obesity",
    "pcos"          : "PCOS",
}

def train():
    if not os.path.exists(DATA_PATH):
        print(f"[ERROR] Dataset not found at: {DATA_PATH}")
        return

    print("[SUCCESS] Dataset found — loading...")
    df = pd.read_csv(DATA_PATH)
    df = df.replace("", np.nan)
    print(f"   {len(df)} rows loaded\n")

    os.makedirs(SAVE_DIR, exist_ok=True)

    for disease_key, disease_name in DISEASE_MAP.items():

        print(f"Training: {disease_name}...")

        # filter only this disease rows
        sub = df[df["disease"] == disease_name].copy()

        if len(sub) < 20:
            print(f"  [WARN] Skipping — not enough data\n")
            continue

        # drop all-empty columns
        sub = sub.dropna(axis=1, how="all")

        # encode categoricals
        for col in sub.select_dtypes(include=["object", "str"]).columns:
            if col in ["disease", "prediction"]:
                continue
            le = LabelEncoder()
            sub[col] = sub[col].fillna("Unknown")
            sub[col] = le.fit_transform(sub[col].astype(str))

        # fill remaining NaN
        sub = sub.fillna(sub.median(numeric_only=True))
        sub = sub.fillna(0)

        # features and target
        drop_cols = ["patient_id", "disease", "prediction"]
        feat_cols = [c for c in sub.columns if c not in drop_cols]
        X = sub[feat_cols]
        y = (sub["prediction"] == "Positive").astype(int)

        # train
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        model = RandomForestClassifier(
            n_estimators=200,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1
        )
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        print(f"  [SUCCESS] Accuracy: {acc*100:.1f}%")
        
        cm = confusion_matrix(y_test, y_pred)
        print(f"  [INFO] Confusion Matrix:\n{cm}\n")

        # save model + feature list
        joblib.dump(model,          os.path.join(SAVE_DIR, f"{disease_key}_model.pkl"))
        joblib.dump(list(X.columns), os.path.join(SAVE_DIR, f"{disease_key}_features.pkl"))
        print(f"  [SUCCESS] Saved -> {disease_key}_model.pkl\n")

    print(" ALL 20 MODELS TRAINED AND SAVED")

if __name__ == "__main__":
    train()
