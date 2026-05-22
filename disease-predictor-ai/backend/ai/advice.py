# advice.py — medicines, tips and warnings for each disease

ADVICE = {
    "diabetes": {
        "medicines" : ["Metformin (consult doctor)", "Glipizide (if prescribed)", "Insulin (severe cases)"],
        "tips"      : ["Reduce sugar and refined carbs", "Walk 30 minutes daily", "Monitor blood sugar regularly"],
        "warnings"  : ["Do not self-medicate with insulin", "Blood sugar above 300 mg/dL needs emergency care"],
    },
    "hypertension": {
        "medicines" : ["Amlodipine (consult doctor)", "Lisinopril (if prescribed)", "Hydrochlorothiazide"],
        "tips"      : ["Reduce salt intake", "Exercise regularly", "Avoid stress and smoking"],
        "warnings"  : ["Never stop BP medicine without doctor", "BP above 180/120 is a medical emergency"],
    },
    "hepatitis": {
        "medicines" : ["Tenofovir (Hep B)", "Sofosbuvir (Hep C)", "Supportive vitamins"],
        "tips"      : ["Avoid alcohol completely", "Eat light easy-to-digest foods", "Rest and hydrate"],
        "warnings"  : ["Can lead to liver failure if untreated", "Avoid sharing needles or personal items"],
    },
    "tuberculosis": {
        "medicines" : ["HRZE regimen (6 months)", "Isoniazid", "Rifampicin", "Pyrazinamide"],
        "tips"      : ["Never skip TB medicine", "Wear a mask around others", "Eat protein-rich foods"],
        "warnings"  : ["TB is contagious — isolate during initial treatment", "Incomplete treatment causes drug resistance"],
    },
    "typhoid": {
        "medicines" : ["Azithromycin (first line)", "Ceftriaxone (severe cases)", "Complete full course"],
        "tips"      : ["Drink only boiled or bottled water", "Eat freshly cooked hot food", "Wash hands thoroughly"],
        "warnings"  : ["XDR Typhoid common in Pakistan — avoid self-medication", "Complete the full antibiotic course"],
    },
    "dengue": {
        "medicines" : ["Paracetamol for fever only", "ORS for hydration", "No ibuprofen or aspirin"],
        "tips"      : ["Rest completely", "Drink coconut water and juices", "Monitor platelet count daily"],
        "warnings"  : ["Platelet below 20,000 needs hospitalization", "NEVER take ibuprofen — causes bleeding"],
    },
    "heart-disease": {
        "medicines" : ["Aspirin (if prescribed)", "Statins for cholesterol", "Beta-blockers (if prescribed)"],
        "tips"      : ["Eat less oil and salt", "Walk 30 minutes daily", "Quit smoking immediately"],
        "warnings"  : ["Chest pain radiating to arm — call 1122 immediately", "Never ignore palpitations"],
    },
    "malaria": {
        "medicines" : ["Artemether-Lumefantrine (Coartem)", "Chloroquine (if sensitive)", "Primaquine (P. vivax)"],
        "tips"      : ["Sleep under mosquito nets", "Use mosquito repellent", "Complete full treatment course"],
        "warnings"  : ["Cerebral malaria is life-threatening", "Do not self-treat — get blood test first"],
    },
    "asthma": {
        "medicines" : ["Salbutamol inhaler (reliever)", "Budesonide inhaler (preventer)", "Montelukast tablets"],
        "tips"      : ["Avoid dust, smoke and allergens", "Always carry your inhaler", "Exercise in clean air"],
        "warnings"  : ["Severe breathlessness needs emergency care", "Never stop preventer inhaler suddenly"],
    },
    "kidney-disease": {
        "medicines" : ["ACE inhibitors (if prescribed)", "Phosphate binders", "Erythropoietin for anemia"],
        "tips"      : ["Limit protein, salt and potassium", "Control blood pressure and diabetes"],
        "warnings"  : ["eGFR below 15 requires dialysis", "Avoid ibuprofen — damages kidneys"],
    },
    "anemia": {
        "medicines" : ["Ferrous sulfate tablets", "Folic acid supplements", "Vitamin B12 if deficient"],
        "tips"      : ["Eat red meat, lentils, spinach", "Take iron with Vitamin C", "Avoid tea with iron tablets"],
        "warnings"  : ["Hemoglobin below 7 needs urgent care", "Do not over-supplement without testing"],
    },
    "thyroid": {
        "medicines" : ["Levothyroxine (hypothyroid)", "Methimazole (hyperthyroid)", "Take on empty stomach"],
        "tips"      : ["Take medicine same time daily", "Get TSH checked every 6 months"],
        "warnings"  : ["Never stop thyroid medicine abruptly", "Untreated hypothyroid causes heart problems"],
    },
    "cholera": {
        "medicines" : ["ORS — most important treatment", "Zinc supplements", "Doxycycline (if severe)"],
        "tips"      : ["Drink ORS continuously", "Boil water before drinking", "Wash hands with soap"],
        "warnings"  : ["Severe dehydration needs IV fluids", "Cholera can kill within hours if untreated"],
    },
    "breast-cancer": {
        "medicines" : ["Tamoxifen (hormone therapy)", "Chemotherapy (as prescribed)", "Trastuzumab (HER2+)"],
        "tips"      : ["Monthly self-breast examination", "Annual mammogram after age 40", "Maintain healthy BMI"],
        "warnings"  : ["Early detection saves lives", "Lump does not always mean cancer — get tested"],
    },
    "pneumonia": {
        "medicines" : ["Amoxicillin (mild)", "Azithromycin (atypical)", "Ceftriaxone (severe)"],
        "tips"      : ["Rest completely", "Steam inhalation helps", "Get pneumococcal vaccine"],
        "warnings"  : ["Oxygen below 94% needs hospitalization", "Pneumonia can be fatal if untreated"],
    },
    "depression": {
        "medicines" : ["SSRIs — prescribed only (Sertraline, Fluoxetine)", "Therapy is as effective as medicine"],
        "tips"      : ["Talk to someone daily", "Exercise — 20 min walk helps", "Maintain sleep schedule"],
        "warnings"  : ["If self-harm thoughts — call Umang: 0317-4288665", "Never stop antidepressants abruptly"],
    },
    "skin-disease": {
        "medicines" : ["Hydrocortisone cream (mild)", "Antihistamines for itching", "Antifungal if fungal"],
        "tips"      : ["Moisturize daily", "Use fragrance-free soap", "Identify and avoid triggers"],
        "warnings"  : ["Spreading rash with fever needs urgent care", "Do not scratch — causes infection"],
    },
    "uti": {
        "medicines" : ["Nitrofurantoin (first line)", "Trimethoprim-Sulfamethoxazole", "Fosfomycin (single dose)"],
        "tips"      : ["Drink 8-10 glasses water daily", "Urinate after sexual activity", "Wipe front to back"],
        "warnings"  : ["Untreated UTI can reach kidneys", "Back pain + fever with UTI — see doctor immediately"],
    },
    "obesity": {
        "medicines" : ["Orlistat (if prescribed)", "No safe OTC weight-loss pills", "Diet and exercise first"],
        "tips"      : ["500 calorie daily deficit", "Eat more protein and fiber", "Walk 10,000 steps daily"],
        "warnings"  : ["Obesity leads to diabetes and heart disease", "Crash diets are dangerous and temporary"],
    },
    "pcos": {
        "medicines" : ["Metformin (insulin resistance)", "OCP for cycle regulation", "Clomiphene for fertility"],
        "tips"      : ["Lose 5-10% body weight — helps significantly", "Low glycemic index diet", "Manage stress"],
        "warnings"  : ["Untreated PCOS increases diabetes risk", "Get hormonal panel every 6 months"],
    },
}

DEFAULT = {
    "medicines" : ["Please consult a qualified doctor"],
    "tips"      : ["Maintain a healthy lifestyle", "Stay hydrated", "Exercise regularly"],
    "warnings"  : ["This is AI screening only — not a medical diagnosis"],
}

def get_advice(disease_key: str, prediction: str, confidence: float, answers: dict = None) -> dict:
    base = ADVICE.get(disease_key, DEFAULT)
    answers = answers or {}
    
    if prediction == "Negative" and confidence < 40:
        # Low risk — lighter advice
        return {
            "medicines": ["No medication needed at this stage"],
            "tips": ["Maintain a healthy lifestyle", "Monitor any symptoms if they appear"] + base["tips"][:1],
            "warnings": ["Continue monitoring your health regularly"],
        }
    
    # High-risk / Moderate-risk: return full advice and add symptom-specific logic
    tips = list(base["tips"])
    warnings = list(base["warnings"])
    medicines = list(base["medicines"])
    
    # --- Symptom-specific additions ---
    if disease_key == "diabetes":
        glucose = float(answers.get("fasting_glucose_mg_dl", 0))
        if glucose > 200:
            warnings.append("Glucose above 200 mg/dL — see doctor within 48 hours")
        if answers.get("slow_healing_wounds") in ["yes", "true", True]:
            tips.append("Check feet daily — diabetic wounds need immediate attention")
            
    elif disease_key == "hypertension":
        systolic = float(answers.get("systolic_bp", 0))
        if systolic > 180:
            warnings.append("CRITICAL: Systolic BP above 180 is a hypertensive crisis. Seek emergency care immediately.")
            
    elif disease_key == "heart-disease":
        if answers.get("pain_radiating_arm") in ["yes", "true", True]:
            warnings.append("URGENT: Pain radiating to the arm is a major heart attack warning sign. Call emergency services.")
            
    elif disease_key == "asthma":
        if answers.get("night_symptoms") in ["yes", "true", True]:
            tips.append("Keep your reliever inhaler bedside for night-time asthma attacks.")
            
    elif disease_key == "kidney-disease":
        if answers.get("blood_in_urine") in ["yes", "true", True]:
            warnings.append("Blood in urine detected. Immediate urological or nephrological evaluation is required.")

    return {"medicines": medicines, "tips": tips, "warnings": warnings}