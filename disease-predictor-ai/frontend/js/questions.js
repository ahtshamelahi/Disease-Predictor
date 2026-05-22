// questions.js (ONLY DATA — NO LOGIC)
// Questions ordered by ML feature importance from Random Forest analysis
// Each key matches a column in the training dataset

window.DISEASE_QUESTIONS = {

    // ─── TIER 1: HIGHEST PREVALENCE ────────────────────────────────────────

    diabetes: [
        { key: "fasting_glucose_mg_dl", question: "Do you know your fasting blood sugar level? (mg/dL)", type: "number", optional: true },
        { key: "hba1c_percent", question: "Do you know your HbA1c (blood sugar average)? (%)", type: "number", optional: true },
        { key: "slow_healing_wounds", question: "Do cuts or wounds on your body heal very slowly?" },
        { key: "excessive_thirst", question: "Do you feel very thirsty even after drinking water?" },
        { key: "blurred_vision", question: "Do you experience blurred or unclear vision?" },
        { key: "tingling_hands_feet", question: "Do you feel tingling or numbness in your hands or feet?" },
        { key: "unexplained_weight_loss", question: "Have you lost weight recently without trying?" },
        { key: "frequent_urination", question: "Do you urinate more than 5–6 times a day?" },
        { key: "fatigue", question: "Do you feel tired or exhausted most of the day?" },
        { key: "bmi", question: "Are you overweight or obese?", type: "bmi" },
        { key: "physical_activity", question: "How would you describe your physical activity level?", type: "select", options: ["Sedentary", "Low", "Moderate", "Active"] },
        { key: "diet_quality", question: "How would you rate your daily diet quality?", type: "select", options: ["Poor", "Average", "Good"] },
        { key: "family_history", question: "Does anyone in your immediate family have diabetes?" }
    ],

    hypertension: [
        { key: "systolic_bp", question: "Do you know your systolic blood pressure? (upper number, mmHg)", type: "number", optional: true },
        { key: "diastolic_bp", question: "Do you know your diastolic blood pressure? (lower number, mmHg)", type: "number", optional: true },
        { key: "headache", question: "Do you frequently get headaches, especially in the morning?" },
        { key: "dizziness", question: "Do you feel dizzy or lightheaded regularly?" },
        { key: "vision_problems", question: "Do you have blurred or double vision at times?" },
        { key: "chest_pain", question: "Do you experience chest pain or pressure?" },
        { key: "shortness_of_breath", question: "Do you feel short of breath during normal activities?" },
        { key: "nosebleed", question: "Do you get frequent nosebleeds without injury?" },
        { key: "fatigue", question: "Do you feel constantly tired or fatigued?" },
        { key: "bmi", question: "Are you overweight or obese?", type: "bmi" },
        { key: "stress_level", question: "What is your daily stress level?", type: "select", options: ["Low", "Medium", "High"] },
        { key: "smoking", question: "Do you smoke cigarettes or use tobacco?" },
        { key: "alcohol", question: "Do you drink alcohol regularly?" },
        { key: "physical_activity", question: "How physically active are you?", type: "select", options: ["Sedentary", "Low", "Moderate", "Active"] },
        { key: "family_history", question: "Does anyone in your family have high blood pressure?" }
    ],

    hepatitis: [
        { key: "jaundice", question: "Has your skin or eyes turned yellow recently?" },
        { key: "dark_urine", question: "Is your urine unusually dark (tea or cola colored)?" },
        { key: "abdominal_pain", question: "Do you have pain or discomfort in your upper right abdomen?" },
        { key: "loss_of_appetite", question: "Have you lost your appetite or desire to eat?" },
        { key: "joint_pain", question: "Do you have joint pain or body aches?" },
        { key: "fatigue", question: "Do you feel unusually tired or weak?" },
        { key: "nausea", question: "Do you feel nauseous or have an urge to vomit?" },
        { key: "alt_enzyme_level", question: "Do you know your ALT liver enzyme level?", type: "number", optional: true },
        { key: "bilirubin_mg_dl", question: "Do you know your bilirubin level? (mg/dL)", type: "number", optional: true },
        { key: "unprotected_exposure", question: "Have you had unprotected contact (blood, needles, or sexual)?" },
        { key: "shared_needles", question: "Have you ever shared needles or syringes?" }
    ],

    tuberculosis: [
        { key: "persistent_cough", question: "Do you have a cough that has lasted more than 2 weeks?" },
        { key: "cough_duration_weeks", question: "How many weeks have you had this cough?", type: "number" },
        { key: "night_sweats", question: "Do you sweat heavily at night while sleeping?" },
        { key: "unexplained_weight_loss", question: "Have you lost significant weight without trying?" },
        { key: "fever", question: "Do you have a persistent low-grade fever?" },
        { key: "bloody_sputum", question: "Have you coughed up blood or blood-stained mucus?" },
        { key: "fatigue", question: "Do you feel extreme tiredness or weakness?" },
        { key: "chest_pain", question: "Do you feel pain in your chest when breathing or coughing?" },
        { key: "tb_contact_history", question: "Have you been in close contact with a TB patient?" },
        { key: "hiv_positive", question: "Are you HIV positive or immunocompromised?" },
        { key: "bcg_vaccinated", question: "Have you received the BCG (TB) vaccine?" }
    ],

    typhoid: [
        { key: "fever_duration_days", question: "How many days have you had a fever?", type: "number" },
        { key: "high_fever", question: "Do you have a high fever (above 38.5°C / 101°F)?" },
        { key: "loss_of_appetite", question: "Have you completely lost your appetite?" },
        { key: "headache", question: "Do you have a persistent, severe headache?" },
        { key: "abdominal_pain", question: "Do you have pain or discomfort in your abdomen?" },
        { key: "nausea_vomiting", question: "Do you feel nauseous or have vomiting?" },
        { key: "diarrhea_constipation", question: "Are you experiencing diarrhea or constipation?" },
        { key: "rose_spots_rash", question: "Do you have small pink spots on your chest or abdomen?" },
        { key: "contaminated_water_exposure", question: "Have you recently consumed potentially contaminated water or food?" },
        { key: "widal_test_positive", question: "Have you done a Widal test? Was it positive?", optional: true }
    ],

    // ─── TIER 2: VERY COMMON ───────────────────────────────────────────────

    dengue: [
        { key: "sudden_high_fever", question: "Did your high fever start suddenly (within hours)?" },
        { key: "joint_muscle_pain", question: "Do you have severe joint and muscle pain (bone-breaking pain)?" },
        { key: "severe_headache", question: "Do you have a very severe headache?" },
        { key: "pain_behind_eyes", question: "Do you feel pain behind your eyes?" },
        { key: "skin_rash", question: "Do you have a rash on your skin?" },
        { key: "mild_bleeding", question: "Have you noticed any unusual bleeding (gums, nose, or under skin)?" },
        { key: "nausea_vomiting", question: "Do you feel nauseous or have vomited?" },
        { key: "fatigue", question: "Do you feel extreme tiredness or weakness?" },
        { key: "mosquito_exposure", question: "Have you been exposed to mosquitoes recently?" },
        { key: "platelet_count", question: "Do you know your platelet count from a recent blood test?", type: "number", optional: true },
        { key: "ns1_antigen", question: "Have you done an NS1 antigen test? Was it positive?", optional: true }
    ],

    "heart-disease": [
        { key: "chest_pain", question: "Do you feel chest pain, pressure, or tightness?" },
        { key: "pain_radiating_arm", question: "Does chest pain spread to your left arm, jaw, or shoulder?" },
        { key: "shortness_of_breath", question: "Do you get short of breath during light activity or at rest?" },
        { key: "palpitations", question: "Do you feel your heart racing or beating irregularly?" },
        { key: "swollen_legs", question: "Do you have swelling in your legs or ankles?" },
        { key: "fatigue", question: "Do you feel unusually tired during normal daily activities?" },
        { key: "dizziness", question: "Do you feel dizzy or lightheaded?" },
        { key: "cholesterol", question: "Do you know your total cholesterol level? (mg/dL)", type: "number", optional: true },
        { key: "systolic_bp", question: "Do you know your systolic blood pressure? (mmHg)", type: "number", optional: true },
        { key: "bmi", question: "Are you overweight or obese?", type: "bmi" },
        { key: "smoking", question: "Do you smoke or use tobacco products?" },
        { key: "diabetes_history", question: "Do you have diabetes or high blood sugar?" },
        { key: "family_history", question: "Has anyone in your family had a heart attack or heart disease?" }
    ],

    malaria: [
        { key: "cyclical_fever", question: "Do you get high fever that comes and goes every 1–3 days?" },
        { key: "chills_rigors", question: "Do you have sudden chills or violent shivering before fever?" },
        { key: "sweating", question: "Do you sweat heavily after the fever breaks?" },
        { key: "fatigue", question: "Do you feel extreme weakness or fatigue?" },
        { key: "spleen_enlargement", question: "Do you feel swelling or discomfort on your left upper abdomen?" },
        { key: "muscle_pain", question: "Do you have muscle pain or body aches?" },
        { key: "nausea_vomiting", question: "Do you feel nauseous or have vomiting?" },
        { key: "headache", question: "Do you have a severe headache?" },
        { key: "mosquito_exposure", question: "Have you been exposed to mosquitoes in the past 2 weeks?" },
        { key: "travel_endemic_area", question: "Have you recently traveled to Balochistan, KPK, or Sindh rural areas?" },
        { key: "rdt_positive", question: "Have you done a malaria rapid test (RDT)? Was it positive?", optional: true }
    ],

    asthma: [
        { key: "shortness_of_breath", question: "Do you feel shortness of breath or difficulty breathing?" },
        { key: "wheezing", question: "Do you hear a whistling or wheezing sound when you breathe?" },
        { key: "chest_tightness", question: "Do you feel tightness or pressure in your chest?" },
        { key: "night_symptoms", question: "Do breathing problems wake you up at night?" },
        { key: "chronic_cough", question: "Do you have a persistent dry cough that won't go away?" },
        { key: "exercise_triggered", question: "Do your symptoms get worse during or after exercise?" },
        { key: "fev1_percent", question: "Do you know your lung function (FEV1) from a spirometry test?", type: "number", optional: true },
        { key: "peak_flow_l_min", question: "Do you know your peak flow reading? (L/min)", type: "number", optional: true },
        { key: "allergy_history", question: "Do you have any known allergies (dust, pollen, animals)?" },
        { key: "smoking", question: "Do you smoke or are you regularly exposed to smoke?" },
        { key: "air_pollution_exposure", question: "Are you frequently exposed to air pollution or dust at work?" },
        { key: "family_history", question: "Does anyone in your family have asthma or breathing problems?" }
    ],

    "kidney-disease": [
        { key: "protein_in_urine", question: "Has a test shown protein in your urine?" },
        { key: "decreased_urine_output", question: "Have you noticed less urine than usual?" },
        { key: "swollen_ankles_feet", question: "Do you have swelling in your ankles, feet, or face?" },
        { key: "foamy_urine", question: "Is your urine foamy or bubbly?" },
        { key: "blood_in_urine", question: "Have you seen blood or pink color in your urine?" },
        { key: "fatigue", question: "Do you feel extreme tiredness or weakness?" },
        { key: "nausea", question: "Do you feel nauseous or have loss of appetite?" },
        { key: "back_pain", question: "Do you have pain in your lower back or sides (near kidneys)?" },
        { key: "creatinine", question: "Do you know your creatinine level? (mg/dL)", type: "number", optional: true },
        { key: "egfr", question: "Do you know your eGFR kidney function score?", type: "number", optional: true },
        { key: "high_bp_history", question: "Do you have a history of high blood pressure?" },
        { key: "diabetes_history", question: "Do you have diabetes or high blood sugar?" }
    ],

    // ─── TIER 3: HIGH DEMAND & UNDERSERVED ────────────────────────────────

    anemia: [
        { key: "hemoglobin_g_dl", question: "Do you know your hemoglobin level? (g/dL)", type: "number", optional: true },
        { key: "fatigue", question: "Do you feel constant tiredness even after resting?" },
        { key: "pale_skin", question: "Has your skin, gums, or inner eyelids become pale?" },
        { key: "shortness_of_breath", question: "Do you get out of breath easily during light activity?" },
        { key: "dizziness", question: "Do you feel dizzy, lightheaded, or faint?" },
        { key: "brittle_nails", question: "Are your nails brittle, spoon-shaped, or breaking easily?" },
        { key: "cold_hands_feet", question: "Do your hands and feet feel unusually cold?" },
        { key: "pica_cravings", question: "Do you have cravings for ice, dirt, or non-food items?" },
        { key: "heavy_periods", question: "Do you have heavy or prolonged menstrual bleeding? (females only)" },
        { key: "diet_iron_poor", question: "Do you eat very little meat, beans, or iron-rich foods?" },
        { key: "serum_ferritin_ng_ml", question: "Do you know your ferritin (iron store) level? (ng/mL)", type: "number", optional: true }
    ],

    thyroid: [
        { key: "tsh_level_uiu_ml", question: "Do you know your TSH (thyroid hormone) level? (uIU/mL)", type: "number", optional: true },
        { key: "fatigue", question: "Do you feel extreme tiredness or sluggishness?" },
        { key: "cold_intolerance", question: "Do you feel unusually cold even in warm weather?" },
        { key: "dry_skin_hair", question: "Is your skin very dry or is your hair thinning/falling?" },
        { key: "neck_swelling", question: "Do you have any swelling or lump in the front of your neck?" },
        { key: "weight_change", question: "Have you gained weight without eating more?" },
        { key: "constipation", question: "Do you suffer from chronic constipation?" },
        { key: "slow_heart_rate", question: "Has a doctor told you your heart beats slower than normal?" },
        { key: "depression", question: "Do you feel depressed, mentally slow, or foggy?" },
        { key: "t4_level_ng_dl", question: "Do you know your T4 thyroid hormone level? (ng/dL)", type: "number", optional: true },
        { key: "family_history", question: "Does anyone in your family have a thyroid condition?" }
    ],

    cholera: [
        { key: "watery_diarrhea", question: "Do you have sudden watery diarrhea (like rice water)?" },
        { key: "diarrhea_episodes_day", question: "How many times have you had diarrhea today?", type: "number" },
        { key: "dehydration", question: "Do you feel severely dehydrated (dry mouth, no urination)?" },
        { key: "vomiting", question: "Are you vomiting repeatedly?" },
        { key: "muscle_cramps", question: "Do you have severe muscle cramps, especially in legs?" },
        { key: "sunken_eyes", question: "Do your eyes look sunken or do you have dry skin that doesn't bounce back?" },
        { key: "nausea", question: "Do you feel constant nausea?" },
        { key: "rapid_heart_rate", question: "Does your heart feel like it is beating very fast?" },
        { key: "contaminated_water", question: "Have you recently drunk tap water, well water, or water from an unknown source?" },
        { key: "poor_sanitation", question: "Do you live in or recently visit an area with poor sanitation?" }
    ],

    "breast-cancer": [
        { key: "lump_in_breast", question: "Have you noticed a lump or thickening in your breast or underarm?" },
        { key: "swollen_lymph_nodes", question: "Are the lymph nodes in your armpit swollen or enlarged?" },
        { key: "nipple_discharge", question: "Do you have any unusual discharge from your nipple?" },
        { key: "skin_dimpling", question: "Does the skin on your breast look dimpled or like orange peel?" },
        { key: "nipple_retraction", question: "Has your nipple turned inward (inverted) recently?" },
        { key: "breast_size_change", question: "Has the shape or size of your breast changed unexpectedly?" },
        { key: "breast_pain", question: "Do you have persistent pain in your breast or nipple area?" },
        { key: "bmi", question: "Are you overweight or obese?", type: "bmi" },
        { key: "age_first_period", question: "At what age did you get your first menstrual period?", type: "number" },
        { key: "hormone_therapy", question: "Have you taken hormone replacement therapy (HRT)?" },
        { key: "brca_mutation", question: "Have you tested positive for the BRCA1 or BRCA2 gene mutation?" },
        { key: "family_history", question: "Has any close female relative had breast or ovarian cancer?" }
    ],

    pneumonia: [
        { key: "fever", question: "Do you have a high fever (above 38°C / 100.4°F)?" },
        { key: "shortness_of_breath", question: "Do you feel short of breath even at rest?" },
        { key: "chest_pain", question: "Do you have sharp chest pain that worsens when breathing or coughing?" },
        { key: "chills", question: "Do you have shaking chills or rigors?" },
        { key: "fatigue", question: "Do you feel extreme weakness or inability to do daily tasks?" },
        { key: "productive_cough", question: "Are you coughing up mucus or phlegm?" },
        { key: "sputum_color", question: "What color is your mucus/phlegm?", type: "select", options: ["Clear", "Yellow", "Green", "Rust/Brown"] },
        { key: "oxygen_saturation_pct", question: "Do you know your oxygen saturation (SpO2)?", type: "number", optional: true },
        { key: "respiratory_rate", question: "Are you breathing faster than normal (more than 20 breaths/min)?" },
        { key: "immunocompromised", question: "Do you have a weakened immune system (diabetes, cancer, HIV, elderly)?" },
        { key: "chest_xray_infiltrate", question: "Has a chest X-ray shown any infection or cloudiness?", optional: true }
    ],

    // ─── TIER 4: GROWING NEED ──────────────────────────────────────────────

    depression: [
        { key: "persistent_sadness", question: "Have you felt persistently sad, hopeless, or empty for 2+ weeks?" },
        { key: "loss_of_interest", question: "Have you lost interest in activities you used to enjoy?" },
        { key: "feelings_of_worthlessness", question: "Do you often feel worthless, guilty, or that you are a burden?" },
        { key: "difficulty_concentrating", question: "Do you have trouble concentrating, thinking, or making decisions?" },
        { key: "sleep_problems", question: "Do you sleep too much, or have trouble sleeping at night?" },
        { key: "low_energy", question: "Do you feel low energy or physically slowed down most days?" },
        { key: "social_withdrawal", question: "Have you been avoiding friends, family, or social situations?" },
        { key: "anxiety_excessive", question: "Do you worry excessively or feel anxious most of the time?" },
        { key: "appetite_change", question: "Has your appetite or weight changed significantly without intention?" },
        { key: "phq9_score", question: "Do you know your PHQ-9 depression score?", type: "number", optional: true },
        { key: "gad7_score", question: "Do you know your GAD-7 anxiety score?", type: "number", optional: true },
        { key: "recent_trauma", question: "Have you recently experienced a traumatic or very stressful life event?" },
        { key: "family_history", question: "Does anyone in your family have depression or anxiety?" }
    ],

    "skin-disease": [
        { key: "itching", question: "Do you have persistent itching on your skin?" },
        { key: "skin_rash", question: "Do you have a visible rash or skin eruption?" },
        { key: "redness", question: "Is the affected skin area red or inflamed?" },
        { key: "skin_thickening", question: "Is the skin becoming thick, scaly, or leathery?" },
        { key: "dry_flaky_skin", question: "Is your skin very dry, flaky, or peeling?" },
        { key: "blisters", question: "Do you have any blisters or fluid-filled bumps on the skin?" },
        { key: "affected_area", question: "Where is the skin problem located?", type: "select", options: ["Face", "Arms", "Legs", "Scalp", "Trunk", "Hands"] },
        { key: "trigger_factor", question: "What seems to trigger or worsen your skin condition?", type: "select", options: ["Heat", "Allergen", "Stress", "Soap/Chemicals", "Food", "Unknown"] },
        { key: "duration_weeks", question: "How many weeks have you had this skin problem?", type: "number" },
        { key: "allergy_history", question: "Do you have a history of allergies or sensitive skin?" },
        { key: "family_history", question: "Does anyone in your family have eczema, psoriasis, or chronic skin conditions?" }
    ],

    uti: [
        { key: "burning_urination", question: "Do you feel a burning or painful sensation when urinating?" },
        { key: "frequent_urination", question: "Do you feel the urge to urinate very frequently but pass little urine?" },
        { key: "cloudy_urine", question: "Is your urine cloudy, murky, or discolored?" },
        { key: "strong_urine_odor", question: "Does your urine have an unusually strong or bad smell?" },
        { key: "pelvic_pain", question: "Do you feel pain or pressure in your lower abdomen or pelvis?" },
        { key: "blood_in_urine", question: "Is there blood or pink/red color in your urine?" },
        { key: "low_grade_fever", question: "Do you have a mild fever or feel feverish?" },
        { key: "back_flank_pain", question: "Do you have pain in your back or sides (flank area)?" },
        { key: "urine_wbc_count", question: "Do you know your urine WBC (white blood cell) count from a test?", type: "number", optional: true },
        { key: "urine_nitrites", question: "Has a urine dipstick test shown nitrites positive?", optional: true },
        { key: "sexual_activity", question: "Have you recently been sexually active?" }
    ],

    obesity: [
        { key: "bmi", question: "Do you know your BMI (Body Mass Index)?", type: "bmi" },
        { key: "waist_circumference_cm", question: "Do you know your waist circumference? (cm)", type: "number", optional: true },
        { key: "calorie_intake_kcal", question: "How many calories do you think you consume per day?", type: "number", optional: true },
        { key: "physical_activity", question: "How physically active are you in daily life?", type: "select", options: ["Sedentary", "Low", "Moderate", "Active"] },
        { key: "diet_quality", question: "How would you rate your diet quality?", type: "select", options: ["Poor", "Average", "Good"] },
        { key: "sugary_drink_daily", question: "Do you drink sugary drinks (soda, juice) daily?" },
        { key: "fast_food_weekly", question: "Do you eat fast food or fried food more than 3 times a week?" },
        { key: "screen_time_hours", question: "How many hours per day do you spend sitting (screen time, desk work)?", type: "number" },
        { key: "sleep_hours", question: "How many hours do you sleep per night on average?", type: "number" },
        { key: "stress_eating", question: "Do you eat more food when stressed or emotional?" },
        { key: "medical_condition", question: "Do you have any condition linked to weight gain?", type: "select", options: ["None", "PCOS", "Hypothyroid", "Diabetes"] },
        { key: "family_history", question: "Does obesity run in your family?" }
    ],

    pcos: [
        { key: "irregular_periods", question: "Are your menstrual periods irregular, missed, or unpredictable?" },
        { key: "period_gap_days", question: "How many days is the typical gap between your periods?", type: "number" },
        { key: "ultrasound_cysts", question: "Has an ultrasound shown cysts on your ovaries?", optional: true },
        { key: "excess_hair_growth", question: "Do you have unwanted hair growth on your face, chest, or abdomen?" },
        { key: "acne", question: "Do you have persistent acne on your face, chest, or back?" },
        { key: "hair_thinning", question: "Is your scalp hair thinning or falling out more than usual?" },
        { key: "weight_gain", question: "Have you gained weight, especially around your abdomen?" },
        { key: "difficulty_conceiving", question: "Are you having difficulty getting pregnant?" },
        { key: "pelvic_pain", question: "Do you experience pelvic pain during or between periods?" },
        { key: "bmi", question: "Are you overweight or obese?", type: "bmi" },
        { key: "testosterone_ng_dl", question: "Do you know your testosterone level from a blood test?", type: "number", optional: true },
        { key: "lh_fsh_ratio", question: "Do you know your LH/FSH hormone ratio from a blood test?", type: "number", optional: true }
    ]

};