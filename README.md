# Used-Mobiles-and-Tablets-Pricing

An end-to-end Machine Learning web application that predicts the **normalized resale price of used mobile devices** based on device specifications, usage information, and pricing features.

The project integrates a trained **Scikit-learn Machine Learning pipeline** with a **FastAPI backend**, **React frontend**, and **Docker**, demonstrating the complete workflow from model development to a functional ML-powered web application.

> **Note:** The prediction is presented in normalized units because the original dataset does not document the normalization formula. Therefore, the predicted value is intentionally not reverse-normalized into a currency value.

---

## 🚀 Project Overview

The objective of this project is to estimate the resale value of used phones and tablets using Machine Learning.

Users enter device specifications through the React web interface. The frontend sends the data to the FastAPI REST API, which validates the request and passes it to the trained Machine Learning pipeline. The generated prediction is then returned to the frontend and displayed to the user.

### Application Workflow

```text
User
  │
  ▼
React Frontend
  │
  │  POST /predict
  ▼
FastAPI Backend
  │
  ▼
Pydantic Validation
  │
  ▼
Scikit-learn Pipeline
  │
  ▼
Machine Learning Model
  │
  ▼
Normalized Used Price
  │
  ▼
React Result Interface
```

---

## ✨ Features

- Machine Learning-based used device price prediction
- End-to-end Scikit-learn preprocessing pipeline
- REST API developed using FastAPI
- Request validation using Pydantic
- Interactive React frontend
- Real-time frontend-backend communication
- Dockerized FastAPI backend
- Automatic Swagger API documentation
- API health-check endpoint
- Error handling and validation
- Reproducible application environment

---

## 🧠 Machine Learning

The trained Machine Learning model is stored as a serialized Scikit-learn pipeline:

```text
model/resale_price_pipeline.joblib
```

Using a pipeline allows the preprocessing transformations and trained estimator to be used together during inference.

The API converts the incoming request into a Pandas DataFrame and sends it directly to the saved pipeline for prediction.

### Input Features

The model uses the following device information:

| Feature | Description |
|---|---|
| `device_brand` | Manufacturer/brand of the device |
| `os` | Operating system |
| `screen_size` | Screen size |
| `four_g` | Whether the device supports 4G |
| `five_g` | Whether the device supports 5G |
| `rear_camera_mp` | Rear camera resolution |
| `front_camera_mp` | Front camera resolution |
| `internal_memory` | Internal storage capacity |
| `ram` | RAM capacity |
| `battery` | Battery specification |
| `weight` | Device weight |
| `release_year` | Year in which the device was released |
| `days_used` | Number of days the device has been used |
| `normalized_new_price` | Normalized price of the device when new |

### Prediction Target

The application predicts:

```text
normalized_used_price
```

The prediction is intentionally returned in normalized form.

---

## 🏗️ Project Structure

```text
Used Pricing/
│
├── Api/
│   ├── main.py
│   ├── predictor.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── model/
│   └── resale_price_pipeline.joblib
│
├── Notebook/
│   └── Machine Learning notebooks
│
├── .dockerignore
├── .gitignore
├── Dockerfile
└── README.md
```

---

## 🛠️ Tech Stack

### Machine Learning & Data Processing

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- Jupyter Notebook

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Containerization

- Docker
- Docker Desktop
- WSL2

### Version Control

- Git
- GitHub

---

# 🔌 FastAPI Backend

The backend exposes REST API endpoints for checking application health and generating predictions.

When running locally, the API is available at:

```text
http://127.0.0.1:8000
```

---

## 📖 Swagger API Documentation

FastAPI automatically generates interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface can be used to test the prediction endpoint directly.

---

## ❤️ Health Check

### Endpoint

```http
GET /health
```

### Example Response

```json
{
  "status": "healthy",
  "model_loaded": true
}
```

A successful response confirms that the API is running.

---

## 🔮 Prediction Endpoint

### Endpoint

```http
POST /predict
```

The endpoint accepts device information and returns the predicted normalized used price.

### Example Request

```json
{
  "device_brand": "Samsung",
  "os": "Android",
  "screen_size": 6.5,
  "four_g": "yes",
  "five_g": "yes",
  "rear_camera_mp": 50,
  "front_camera_mp": 12,
  "internal_memory": 128,
  "ram": 8,
  "battery": 5000,
  "weight": 190,
  "release_year": 2022,
  "days_used": 300,
  "normalized_new_price": 4.7
}
```

### Example Response

```json
{
  "predicted_normalized_used_price": 4.2191,
  "unit": "normalized",
  "note": "Prediction is presented in normalized units because the original dataset does not document the normalization formula."
}
```

---

# 🌐 React Frontend

The project includes a React-based user interface where users can enter device information and request a prediction.

The frontend:

1. Collects device specifications from the user.
2. Converts the form data into the required JSON structure.
3. Sends a POST request to the FastAPI `/predict` endpoint.
4. Receives the prediction from the backend.
5. Displays the normalized prediction in the browser.
6. Handles API and validation errors.

During development, the frontend runs at:

```text
http://localhost:5173
```

---

# ⚙️ Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/used-device-price-prediction.git
```

Move into the project:

```bash
cd used-device-price-prediction
```

---

## 2. Set Up the Python Environment

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

Activate the environment:

```bash
venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r Api/requirements.txt
```

---

## 3. Run the FastAPI Backend

From the project root, run:

```bash
uvicorn Api.main:app --host 0.0.0.0 --port 8000
```

The API should now be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Running the React Frontend

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install the Node.js dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The React application should now be running.

> The FastAPI backend must also be running for predictions to work.

---

# 🐳 Running the Backend with Docker

The FastAPI backend can also be run inside a Docker container.

## Build the Docker Image

Run the following command from the project root:

```bash
docker build -t used-pricing-api .
```

---

## Run the Docker Container

```bash
docker run -p 8000:8000 --name used-pricing-container used-pricing-api
```

The API will be accessible at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Stop the Container

```bash
docker stop used-pricing-container
```

---

## Remove the Container

```bash
docker rm used-pricing-container
```

---

# 🧪 API Testing

The API was tested using FastAPI's Swagger interface.

The following endpoints were verified:

```text
GET  /
GET  /health
POST /predict
GET  /docs
```

A valid prediction request returns:

```text
200 OK
```

Invalid or incomplete request bodies are rejected by FastAPI/Pydantic with:

```text
422 Unprocessable Entity
```

---

# 🔒 Input Validation

The backend uses Pydantic models to define the expected API request structure.

```python
class DeviceInput(BaseModel):
    device_brand: str
    os: str
    screen_size: float
    four_g: str
    five_g: str
    rear_camera_mp: float
    front_camera_mp: float
    internal_memory: float
    ram: float
    battery: float
    weight: float
    release_year: int
    days_used: int
    normalized_new_price: float
```

This prevents malformed requests from being passed directly to the Machine Learning model.

---

# 🔄 Frontend-Backend Integration

The React application communicates with FastAPI through HTTP requests.

```text
React
   │
   │ JSON Request
   ▼
POST /predict
   │
   ▼
FastAPI
   │
   ▼
Pydantic Validation
   │
   ▼
Pandas DataFrame
   │
   ▼
Scikit-learn Pipeline
   │
   ▼
Prediction
   │
   ▼
JSON Response
   │
   ▼
React Prediction Card
```

This architecture separates the Machine Learning/backend logic from the user interface.

---

# 📊 Prediction Output

The final application displays results such as:

```text
Predicted Normalized Used Price

4.2191

Unit: normalized
```

The model output is **not converted into INR, USD, or another currency**.

The original dataset does not provide sufficient documentation for the normalization formula used for the price variables. Attempting to reverse the normalization without this information would require making an unsupported assumption.

Therefore, the application presents the model output directly in normalized units.

---

# 🐳 Why Docker?

Docker is used to package the FastAPI application, Python dependencies, and Machine Learning environment into a reproducible container.

This helps avoid problems caused by differences in:

- Python versions
- Scikit-learn versions
- NumPy versions
- Joblib versions
- Operating systems
- Local development environments

The Dockerized application can therefore run in a consistent environment.

---

# 📌 Key Learning Outcomes

This project demonstrates practical experience with:

- Exploratory Data Analysis
- Data preprocessing
- Machine Learning model development
- Scikit-learn pipelines
- Model serialization using Joblib
- Model inference
- REST API development
- FastAPI
- Pydantic validation
- React
- Vite
- Frontend-backend integration
- HTTP requests
- JSON APIs
- API error handling
- Docker
- WSL2
- Git and GitHub
- End-to-end Machine Learning application development

---

# 🚀 Future Improvements

Possible future enhancements include:

- [ ] Deploy the application to a cloud platform
- [ ] Dockerize the React frontend
- [ ] Add Docker Compose for frontend and backend orchestration
- [ ] Improve frontend UI/UX
- [ ] Add automated API tests
- [ ] Add frontend tests
- [ ] Add CI/CD using GitHub Actions
- [ ] Add model versioning
- [ ] Add application logging
- [ ] Add monitoring
- [ ] Add model explainability
- [ ] Add prediction history
- [ ] Improve API validation constraints

---

# 👩‍💻 Author

**Jannat Chugh**

B.Tech – Electronics and Communication Engineering (Artificial Intelligence)

Interested in:

- Data Analytics
- Data Science
- Machine Learning
- Artificial Intelligence
- End-to-End ML Applications

---

## ⭐ Support

If you found this project interesting or useful, consider giving the repository a ⭐.
