# preprocess.py
# Converts frontend answer dict → float dict aligned to CSV column names.
# Keys in questions.js already match CSV columns exactly — just encode types.

def preprocess_answers(disease, answers):
    """
    Encode every answer value to a float.
    yes/no  → 1.0 / 0.0
    numbers → float
    None    → 0.0  (skipped / optional)
    select  → kept as string for LabelEncoder to handle (same as training)
    """

    BOOL_YES  = {"yes", "true", "positive"}
    BOOL_NO   = {"no", "false", "negative"}

    def encode(val):
        if val is None:
            return 0.0
        if isinstance(val, (int, float)):
            return float(val)
        s = str(val).strip().lower()
        if s in BOOL_YES:
            return 1.0
        if s in BOOL_NO:
            return 0.0
        try:
            return float(s)
        except ValueError:
            return val          # keep strings (select fields) as-is for matching

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
        encoded[csv_key] = encode(val)

    return encoded