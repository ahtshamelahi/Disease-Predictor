# preprocess.py
# Converts frontend answer dict → float dict aligned to CSV column names.
# Keys in questions.js already match CSV columns exactly — just encode types.

# ── LABEL ENCODER MAPPINGS ─────────────────────────────────────────
# LabelEncoder sorts alphabetically and assigns 0, 1, 2, ...
# These must match the exact values used during training.
LABEL_MAPS = {
    "physical_activity":  {"Active": 0, "Low": 1, "Moderate": 2, "Sedentary": 3},
    "diet_quality":       {"Average": 0, "Good": 1, "Poor": 2},
    "stress_level":       {"High": 0, "Low": 1, "Medium": 2},
    "sputum_color":       {"Clear": 0, "Green": 1, "Rust": 2, "Rust/Brown": 2, "Yellow": 3},
    "affected_area":      {"Arms": 0, "Face": 1, "Hands": 2, "Legs": 3, "Scalp": 4, "Trunk": 5},
    "trigger_factor":     {"Allergen": 0, "Food": 1, "Heat": 2, "Soap": 3, "Soap/Chemicals": 3, "Stress": 4, "Unknown": 5},
    "medical_condition":  {"Diabetes": 0, "Hypothyroid": 1, "None": 2, "PCOS": 3},
}


def preprocess_answers(disease, answers):
    """
    Encode every answer value to a float.
    yes/no   → 1.0 / 0.0
    numbers  → float
    None     → 0.0  (skipped / optional)
    select   → numeric via LABEL_MAPS (matches LabelEncoder from training)
    """

    BOOL_YES  = {"yes", "true", "positive"}
    BOOL_NO   = {"no", "false", "negative"}

    def encode(key, val):
        if val is None:
            return 0.0
        if isinstance(val, (int, float)):
            return float(val)

        s = str(val).strip()

        # Check if this is a select field with a known label mapping
        if key in LABEL_MAPS:
            if s in LABEL_MAPS[key]:
                return float(LABEL_MAPS[key][s])
            # Try case-insensitive match
            for label, num in LABEL_MAPS[key].items():
                if label.lower() == s.lower():
                    return float(num)
            return 0.0  # fallback for unknown labels

        s_lower = s.lower()
        if s_lower in BOOL_YES:
            return 1.0
        if s_lower in BOOL_NO:
            return 0.0
        try:
            return float(s_lower)
        except ValueError:
            return 0.0  # fallback: unknown string → 0

    # Cholera: 'vomiting' question key vs CSV column 'nausea_vomiting'
    REMAP = {
        "cholera": {
            "vomiting": "nausea_vomiting",
        }
    }

    encoded = {}
    remap = REMAP.get(disease, {})

    for key, val in answers.items():
        csv_key = remap.get(key, key)       # rename if needed
        encoded[csv_key] = encode(csv_key, val)

    return encoded
