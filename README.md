# Used Mobiles & Tablets Price Prediction

An end-to-end **Machine Learning application** that predicts the resale value of used mobile phones and tablets from their specifications and usage history.

I built this project to take a typical tabular ML problem beyond a notebook: train the model, save the complete preprocessing pipeline, expose it through an API, connect it to a frontend, and package the backend with Docker.

> **Important:** The model predicts the target in normalized units because the original dataset does not document the normalization formula. I therefore do not convert the prediction into a currency value.

---

## Problem

Used-device pricing depends on several factors such as:

* Brand
* Operating system
* RAM
* Storage
* Camera specifications
* Battery
* Network support
* Release year
* Usage duration
* Original normalized price

The goal of this project is to estimate the **normalized resale price** from these device characteristics.

The application allows a user to enter the device details through a web interface and receive a prediction from the trained ML model.

---

# How It Works

```text
User
  │
  ▼
React Frontend
  │
  │  JSON request
  ▼
FastAPI API
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
Trained ML Model
  │
  ▼
Predicted Normalized Used Price
  │
  ▼
React Interface
```

The application separates the **model**, **API**, and **frontend**, making it easier to test and run each part independently.

---

# Machine Learning Workflow

The ML workflow was developed in the Jupyter notebook before being integrated into the application.

### 1. Data Exploration

The dataset was first explored to understand:

* Feature types
* Missing values
* Numerical distributions
* Categorical variables
* Relationships between device characteristics and resale price

### 2. Feature Preparation

The model uses device and usage information including:

| Feature                | Description               |
| ---------------------- | ------------------------- |
| `device_brand`         | Device manufacturer       |
| `os`                   | Operating system          |
| `screen_size`          | Screen size               |
| `four_g`               | 4G support                |
| `five_g`               | 5G support                |
| `rear_camera_mp`       | Rear camera resolution    |
| `front_camera_mp`      | Front camera resolution   |
| `internal_memory`      | Internal storage          |
| `ram`                  | RAM                       |
| `battery`              | Battery specification     |
| `weight`               | Device weight             |
| `release_year`         | Device release year       |
| `days_used`            | Number of days used       |
| `normalized_new_price` | Normalized original price |

### 3. Preprocessing Pipeline

Instead of saving only the trained estimator, the project saves the **complete Scikit-learn preprocessing and model pipeline**.

```text
Input Data
    ↓
Preprocessing
    ↓
Feature Transformation
    ↓
Trained Estimator
    ↓
Prediction
```

This means the same transformations used during training can be applied consistently when the API receives new data.

### 4. Model Serialization

The trained pipeline is stored using Joblib:

```text
model/resale_price_pipeline.joblib
```

The FastAPI backend loads this pipeline during inference.

---

# Prediction Target

The model predicts:

```text
normalized_used_price
```

The output is intentionally kept in normalized form.

The original dataset does not provide enough information to reconstruct the original currency scale, so converting the prediction into INR or another currency would require an unsupported assumption.

For example, the API can return:

```json
{
  "predicted_normalized_used_price": 4.2191,
  "unit": "normalized"
}
```

---

# Application

## React Frontend

The frontend provides a form where users enter the device specifications.

The application then:

1. Collects the input values
2. Builds the JSON request
3. Sends it to the FastAPI `/predict` endpoint
4. Receives the prediction
5. Displays the result
6. Handles validation and API errors

---

## FastAPI Backend

The backend exposes REST endpoints for the application.

### Health Check

```text
GET /health
```

Returns the API and model status.

Example:

```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Prediction

```text
POST /predict
```

Receives the device specifications and returns the predicted normalized used price.

### API Documentation

FastAPI automatically provides interactive Swagger documentation at:

```text
/docs
```

This makes it possible to test the API without using the React frontend.

---

# Input Validation

The API uses **Pydantic** models to validate incoming requests before they reach the ML pipeline.

This helps catch:

* Missing fields
* Incorrect data types
* Invalid request structures

For invalid requests, the API returns an appropriate validation response rather than passing malformed data directly to the model.

---

# Docker

The FastAPI backend is Dockerized to make the application environment reproducible.

The Docker setup packages:

* Python environment
* Required dependencies
* FastAPI application
* ML pipeline

This reduces dependency-related differences between development environments.

---

# Project Structure

```text
Used-Mobiles-and-Tablets-Pricing/
│
├── Api/
│   ├── main.py
│   ├── predictor.py
│   ├── schemas.py
│   └── requirements.txt
│
├── Notebook/
│   └── Machine Learning notebooks
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── model/
│   └── resale_price_pipeline.joblib
│
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

---

# Tech Stack

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib
* Jupyter Notebook

### Backend

* FastAPI
* Pydantic
* Uvicorn

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Deployment / Environment

* Docker

### Version Control

* Git
* GitHub

---

# Running Locally

## 1. Clone the repository

```bash
git clone https://github.com/jannatchugh01/Used-Mobiles-and-Tablets-Pricing.git

cd Used-Mobiles-and-Tablets-Pricing
```

## 2. Create a Python environment

```bash
python -m venv venv
```

Activate the environment and install the backend dependencies:

```bash
pip install -r Api/requirements.txt
```

## 3. Start FastAPI

```bash
uvicorn Api.main:app --host 0.0.0.0 --port 8000
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## 4. Start the React frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available through the Vite development server.

---

# Docker Setup

Build the backend image:

```bash
docker build -t used-pricing-api .
```

Run the container:

```bash
docker run -p 8000:8000 --name used-pricing-container used-pricing-api
```

The API will then be available on port `8000`.

---

# API Testing

The API was tested using FastAPI's Swagger interface.

The main endpoints include:

```text
GET  /
GET  /health
POST /predict
GET  /docs
```

A valid prediction request returns a successful response, while invalid request bodies are rejected through Pydantic validation.

---

# What I Learned

The main learning from this project was moving from **model development to model integration**.

Building the model in a notebook is only one part of an ML application. I also had to think about how the model would receive new data, how inputs should be validated, how predictions should be exposed through an API, and how the application could be run consistently.

This project gave me hands-on practice with:

* Exploratory data analysis
* Feature preprocessing
* Scikit-learn pipelines
* Model serialization
* ML inference
* REST APIs
* Request validation
* React and API integration
* Docker
* Local application testing

---

# Limitations

There are a few limitations to keep in mind:

* The prediction target is available only in normalized form.
* The original dataset does not document the normalization formula.
* The model's performance depends on the quality and coverage of the original dataset.
* The application is intended as a demonstration of an end-to-end ML workflow rather than a production pricing system.

---

## Author

**Jannat Chugh**

B.Tech ECE-AI | Data Analytics & Data Science

[GitHub](https://github.com/jannatchugh01) • [Portfolio](https://jannatchugh01.github.io/)
