from flask import Flask, request, jsonify
import pickle
import re
import numpy as np
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
import nltk

nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

# Load the saved model files
lg = pickle.load(open("logistic_regresion.pkl", "rb"))
tfidf_vectorizer = pickle.load(open("tfidf_vectorizer.pkl", "rb"))
lb = pickle.load(open("label_encoder.pkl", "rb"))


def clean_text(text):
    stemmer = PorterStemmer()
    text = re.sub("[^a-zA-Z]", " ", text)
    text = text.lower().split()
    text = [stemmer.stem(word) for word in text if word not in stop_words]
    return " ".join(text)


def predict_emotion(input_text):
    cleaned_text = clean_text(input_text)
    input_vectorized = tfidf_vectorizer.transform([cleaned_text])
    predicted_label = lg.predict(input_vectorized)[0]
    predicted_emotion = lb.inverse_transform([predicted_label])[0]
    # If your model supports probabilities, get the confidence score
    confidence = float(np.max(lg.predict_proba(input_vectorized)))
    return predicted_emotion, confidence


app = Flask(__name__)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    emotion, confidence = predict_emotion(text)
    return jsonify({"emotion": emotion, "confidence": confidence})


if __name__ == "__main__":
    app.run(port=5000, debug=True)


# from flask import Flask, request, jsonify
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# import torch
# import numpy as np
# from flask_cors import CORS


# # Use a proper classification model
# model_name = "bhadresh-savani/bert-base-go-emotion"
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# # model = AutoModelForSequenceClassification.from_pretrained(model_name)


# model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model.to(device)

# # Emotion labels from the model's documentation
# emotion_labels = ['admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring', 'confusion',
#                   'curiosity', 'desire', 'disappointment', 'disapproval', 'disgust', 'embarrassment',
#                   'excitement', 'fear', 'gratitude', 'grief', 'joy', 'love', 'nervousness',
#                   'optimism', 'pride', 'realization', 'relief', 'remorse', 'sadness', 'surprise', 'neutral']

# def predict_emotion(text):
#     inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(device)

#     with torch.no_grad():
#         outputs = model(**inputs)
#         logits = outputs.logits
#         probs = torch.nn.functional.softmax(logits, dim=-1)
#         confidence, predicted_class = torch.max(probs, dim=1)

#     emotion = emotion_labels[predicted_class.item()]
#     return emotion, confidence.item()

# app = Flask(__name__)
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json(force=True)
#     text = data.get('text', '')
#     if not text:
#         return jsonify({'error': 'No text provided'}), 400

#     emotion, confidence = predict_emotion(text)
#     return jsonify({
#         'emotion': emotion,
#         'confidence': confidence
#     })

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)
