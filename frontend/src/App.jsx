import { useState } from "react";
import "./App.css";

const initialState = {
  age: "", sex: "1", cp: "0", trestbps: "", chol: "", fbs: "0",
  restecg: "0", thalach: "", exang: "0", oldpeak: "", slope: "0",
  ca: "0", thal: "1"
};

function App() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {};
    Object.keys(form).forEach((key) => {
      payload[key] = key === "oldpeak" ? parseFloat(form[key]) : parseInt(form[key]);
    });

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend. Is FastAPI running?");
    }
    setLoading(false);
  };

  const riskColor = {
    Low: "#2e7d32",
    Medium: "#f9a825",
    High: "#c62828",
  };

  return (
    <div className="container">
      <h1>Heart Disease Risk Predictor</h1>
      <p className="subtitle">Enter your health parameters below</p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field">
          <label>Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Sex</label>
          <select name="sex" value={form.sex} onChange={handleChange}>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

        <div className="field">
          <label>Chest Pain Type</label>
          <select name="cp" value={form.cp} onChange={handleChange}>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
        </div>

        <div className="field">
          <label>Resting Blood Pressure (mm Hg)</label>
          <input type="number" name="trestbps" value={form.trestbps} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Cholesterol (mg/dl)</label>
          <input type="number" name="chol" value={form.chol} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Fasting Blood Sugar &gt; 120 mg/dl</label>
          <select name="fbs" value={form.fbs} onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="field">
          <label>Resting ECG Result</label>
          <select name="restecg" value={form.restecg} onChange={handleChange}>
            <option value="0">Normal</option>
            <option value="1">ST-T Abnormality</option>
            <option value="2">Left Ventricular Hypertrophy</option>
          </select>
        </div>

        <div className="field">
          <label>Max Heart Rate Achieved</label>
          <input type="number" name="thalach" value={form.thalach} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Exercise Induced Angina</label>
          <select name="exang" value={form.exang} onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="field">
          <label>ST Depression (oldpeak)</label>
          <input type="number" step="0.1" name="oldpeak" value={form.oldpeak} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Slope of ST Segment</label>
          <select name="slope" value={form.slope} onChange={handleChange}>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
        </div>

        <div className="field">
          <label>Major Vessels Colored (0-3)</label>
          <input type="number" name="ca" min="0" max="3" value={form.ca} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Thalassemia</label>
          <select name="thal" value={form.thal} onChange={handleChange}>
            <option value="1">Normal</option>
            <option value="2">Fixed Defect</option>
            <option value="3">Reversible Defect</option>
          </select>
        </div>

        <button type="submit" className="predict-btn" disabled={loading}>
          {loading ? "Predicting..." : "Predict Risk"}
        </button>
      </form>

      {result && (
        <div className="result-card" style={{ borderColor: riskColor[result.risk_level] }}>
          <h2>Result</h2>
          <p className="risk-percent" style={{ color: riskColor[result.risk_level] }}>
            {result.risk_percentage}% Risk
          </p>
          <p className="risk-level">Risk Level: <strong>{result.risk_level}</strong></p>
          <p className="factors">Top contributing factors: {result.top_factors.join(", ")}</p>
          <p className="disclaimer">
            ⚠️ This is an educational project, not a medical diagnosis. Consult a doctor for real health concerns.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;