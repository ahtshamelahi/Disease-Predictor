from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.ai.predictor import predict_disease

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({"status": "AI Health API Running"})


# ── ONE DYNAMIC ROUTE HANDLES ALL 20 DISEASES ──────────────────────
@app.route("/api/predict/<disease_key>", methods=["POST"])
def predict_route(disease_key):
    try:
        data    = request.get_json()
        answers = data.get("answers", {})

        print("\n" + "="*50)
        print(f"DISEASE   : {disease_key}")
        print(f"ANSWERS   : {answers}")

        result  = predict_disease(disease_key, answers)

        print(f"RESULT    : {result}")
        print("="*50 + "\n")

        return jsonify(result), 200

    except Exception as e:
        import traceback
        print("ERROR:", str(e))
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)