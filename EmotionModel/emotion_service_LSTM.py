from flask import Flask, request, jsonify
import numpy as np
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

# Load the LSTM model and preprocessing tools
model = load_model("model1.h5")
label_encoder = pickle.load(open("lb1.pkl", "rb"))
tokenizer_info = pickle.load(open("vocab_info.pkl", "rb"))

tokenizer = tokenizer_info["tokenizer"]
max_len = tokenizer_info["max_len"]

# Preprocessing function
def clean_text(text):
    stemmer = PorterStemmer()
    text = re.sub("[^a-zA-Z]", " ", text)
    text = text.lower().split()
    text = [stemmer.stem(word) for word in text if word not in stop_words]
    return " ".join(text)

# Predict function using LSTM model
def predict_emotion_lstm(input_text):
    cleaned_text = clean_text(input_text)
    seq = tokenizer.texts_to_sequences([cleaned_text])
    padded = pad_sequences(seq, maxlen=max_len, padding="post", truncating="post")
    prediction = model.predict(padded)[0]
    predicted_label = np.argmax(prediction)
    predicted_emotion = label_encoder.inverse_transform([predicted_label])[0]
    confidence = float(np.max(prediction))
    return predicted_emotion, confidence

# Flask App
app = Flask(__name__)

@app.route("/predict_lstm", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    emotion, confidence = predict_emotion_lstm(text)
    return jsonify({"emotion": emotion, "confidence": confidence})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
