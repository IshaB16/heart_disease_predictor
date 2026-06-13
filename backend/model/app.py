from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("heart_model.pkl")
scaler = joblib.load("scaler.pkl")
feature_names = joblib.load("feature_names.pkl")

class PatientData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.post("/predict")
def predict(data: PatientData):
    input_data = np.array([[getattr(data, f) for f in feature_names]])
    input_scaled = scaler.transform(input_data)

    prediction = model.predict(input_scaled)[0]
    probability = model.predict_proba(input_scaled)[0][1]  # prob of disease

    # feature importance for "why" explanation
    importances = model.feature_importances_
    top_features = sorted(
        zip(feature_names, importances), key=lambda x: x[1], reverse=True
    )[:3]

    return {
        "prediction": int(prediction),
        "risk_percentage": round(float(probability) * 100, 1),
        "risk_level": "High" if probability > 0.6 else "Medium" if probability > 0.3 else "Low",
        "top_factors": [f[0] for f in top_features],
    }