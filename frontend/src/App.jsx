import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    device_brand: "",
    os: "",
    screen_size: "",
    four_g: "",
    five_g: "",
    rear_camera_mp: "",
    front_camera_mp: "",
    internal_memory: "",
    ram: "",
    battery: "",
    weight: "",
    release_year: "",
    days_used: "",
    normalized_new_price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [prediction, setPrediction] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setPrediction(null);
  setError("");

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_brand: formData.device_brand,
        os: formData.os,
        screen_size: Number(formData.screen_size),
        four_g: formData.four_g,
        five_g: formData.five_g,
        rear_camera_mp: Number(formData.rear_camera_mp),
        front_camera_mp: Number(formData.front_camera_mp),
        internal_memory: Number(formData.internal_memory),
        ram: Number(formData.ram),
        battery: Number(formData.battery),
        weight: Number(formData.weight),
        release_year: Number(formData.release_year),
        days_used: Number(formData.days_used),
        normalized_new_price: Number(formData.normalized_new_price),
      }),
    });

    if (!response.ok) {
    const errorData = await response.json();
    console.log("API validation error:", errorData);

    throw new Error(
      errorData.detail
        ? JSON.stringify(errorData.detail)
        : `API request failed with status ${response.status}`
    );
  }

    const data = await response.json();

    setPrediction(data);
  } catch (err) {
    console.error(err);
    setError("Unable to get prediction. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">USED DEVICE PRICING</p>

        <h1>Used Device Price Predictor</h1>

        <p className="subtitle">
          Enter the specifications of a used phone or tablet to generate a
          predicted normalized resale price.
        </p>
      </header>

      <main className="container">
        <form className="prediction-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>Device Information</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Device Brand</label>
                <input
                  type="text"
                  name="device_brand"
                  value={formData.device_brand}
                  onChange={handleChange}
                  placeholder="e.g. Samsung"
                  required
                />
              </div>

              <div className="form-group">
                <label>Operating System</label>
                <input
                  type="text"
                  name="os"
                  value={formData.os}
                  onChange={handleChange}
                  placeholder="e.g. Android"
                  required
                />
              </div>

              <div className="form-group">
                <label>Screen Size</label>
                <input
                  type="number"
                  step="any"
                  name="screen_size"
                  value={formData.screen_size}
                  onChange={handleChange}
                  placeholder="e.g. 6.5"
                  required
                />
              </div>

              <div className="form-group">
                <label>4G Available</label>
                <select
                  name="four_g"
                  value={formData.four_g}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>5G Available</label>
                <select
                  name="five_g"
                  value={formData.five_g}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Hardware Specifications</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Rear Camera (MP)</label>
                <input
                  type="number"
                  step="any"
                  name="rear_camera_mp"
                  value={formData.rear_camera_mp}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  required
                />
              </div>

              <div className="form-group">
                <label>Front Camera (MP)</label>
                <input
                  type="number"
                  step="any"
                  name="front_camera_mp"
                  value={formData.front_camera_mp}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  required
                />
              </div>

              <div className="form-group">
                <label>Internal Memory (GB)</label>
                <input
                  type="number"
                  step="any"
                  name="internal_memory"
                  value={formData.internal_memory}
                  onChange={handleChange}
                  placeholder="e.g. 128"
                  required
                />
              </div>

              <div className="form-group">
                <label>RAM (GB)</label>
                <input
                  type="number"
                  step="any"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  required
                />
              </div>

              <div className="form-group">
                <label>Battery (mAh)</label>
                <input
                  type="number"
                  step="any"
                  name="battery"
                  value={formData.battery}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  required
                />
              </div>

              <div className="form-group">
                <label>Weight (g)</label>
                <input
                  type="number"
                  step="any"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 190"
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Usage & Pricing</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Release Year</label>
                <input
                  type="number"
                  name="release_year"
                  value={formData.release_year}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  required
                />
              </div>

              <div className="form-group">
                <label>Days Used</label>
                <input
                  type="number"
                  name="days_used"
                  value={formData.days_used}
                  onChange={handleChange}
                  placeholder="e.g. 300"
                  required
                />
              </div>

              <div className="form-group">
                <label>Normalized New Price</label>
                <input
                  type="number"
                  step="any"
                  name="normalized_new_price"
                  value={formData.normalized_new_price}
                  onChange={handleChange}
                  placeholder="e.g. 5.5"
                  required
                />
              </div>
            </div>
          </section>

          <button type="submit" className="predict-button">
            Predict Used Price
          </button>
          {loading && (
      <div className="status-message">
        Predicting...
      </div>
    )}

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    {prediction && (
      <div className="result-card">
        <p className="result-label">Predicted Normalized Used Price</p>

        <h3>{prediction.predicted_normalized_used_price}</h3>

        <p className="result-unit">
          Unit: {prediction.unit}
        </p>

        <p className="result-note">
          {prediction.note}
        </p>
      </div>
    )}
        </form>
      </main>
    </div>
  );
}

export default App;