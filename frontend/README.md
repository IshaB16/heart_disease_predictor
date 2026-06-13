# 🫀 Heart Disease Risk Predictor

A full-stack machine learning web app that predicts a person's risk of heart disease based on key health parameters, with an explanation of the top contributing factors.

🔗 **Live Demo:** [heart-disease-predictor-nu.vercel.app](https://heart-disease-predictor-nu.vercel.app)
📄 **API Docs:** [heart-disease-api-yti4.onrender.com/docs](https://heart-disease-api-yti4.onrender.com/docs)

> ⚠️ Note: Backend is hosted on Render's free tier, so it may take 30-50 seconds to "wake up" on the first request.

## 📸 Screenshot

![App Screenshot](./screenshot.png)

## 🎯 Overview

This project takes 13 clinical parameters (age, cholesterol, blood pressure, chest pain type, etc.) as input and predicts:
- The probability of heart disease (as a %)
- A risk level (Low / Medium / High)
- The top 3 factors driving the prediction

Built to combine my interest in machine learning with full-stack web development.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Custom CSS (responsive design)

**Backend:**
- FastAPI (Python)
- Scikit-learn (Random Forest Classifier)
- Pandas, NumPy, Joblib

**Deployment:**
- Frontend → Vercel
- Backend → Render

## 📊 Model Performance

- **Dataset:** UCI Heart Disease Dataset (combined, ~900 records)
- **Algorithm:** Random Forest Classifier
- **Accuracy:** 84.2%
- **Precision/Recall:** 0.85 / 0.84 (weighted avg)

## 🚀 Running Locally

### Backend
```bash
cd backend/model
pip install -r requirements.txt
python train_model.py   # generates model files
uvicorn app:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Update the API URL in `frontend/src/App.jsx` to `http://localhost:8000/predict` if running locally.

## 📁 Project Structure
heart_disease_predictor/

├── backend/model/

│   ├── app.py              # FastAPI app

│   ├── train_model.py      # Model training script

│   ├── heart_disease_combined.csv

│   └── requirements.txt

└── frontend/

├── src/

│   ├── App.jsx

│   └── App.css

└── package.json

## ⚠️ Disclaimer

This project is built for educational and portfolio purposes only. It is **not a substitute for professional medical advice, diagnosis, or treatment**. Always consult a qualified healthcare provider for medical concerns.

## 🔮 Future Improvements

- Add SHAP-based explainability for deeper insights
- Add user authentication to save prediction history
- Add more visualizations (risk gauge, factor charts)

## 👤 Author

Built by Isha Bhangre 
[LinkedIn](https://www.linkedin.com/in/isha-bhangre-b551a4330/) | [GitHub](https://github.com/IshaB16)
