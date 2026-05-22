from flask import Blueprint, request, jsonify
from backend.ai.predictor import predict_disease

api = Blueprint("api", __name__)

@api.route("/predict/asthma", methods=["POST"])
def asthma_predict():

    try:
        data = request.get_json()

        print("Received:", data)  # DEBUG

        answers = data.get("answers", {})

        result = predict_disease(answers)

        return jsonify(result)

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            "error": "Backend failed",
            "message": str(e)
        }), 500