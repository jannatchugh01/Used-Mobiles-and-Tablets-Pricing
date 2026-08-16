from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import DeviceInput, PredictionResponse
from predictor import predict_price


app = FastAPI(
    title="Used Device Price Prediction API",
    description="API for predicting used phone and tablet prices.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Used Device Price Prediction API is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": True
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(device: DeviceInput):

    prediction = predict_price(
        device.model_dump()
    )

    return {
        "predicted_normalized_used_price": round(float(prediction), 4),
        "unit": "normalized",
        "note": "Prediction is presented in normalized units because the original dataset does not document the normalization formula."
    }