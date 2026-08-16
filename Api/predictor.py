import joblib
import pandas as pd


MODEL_PATH = "model/resale_price_pipeline.joblib"

model = joblib.load(MODEL_PATH)


def predict_price(data: dict):
    input_data = pd.DataFrame([data])

  # Convert API field names to the original model feature names
    input_data = input_data.rename(
        columns={
            "four_g": "4g",
            "five_g": "5g"
        }
    )

    prediction = model.predict(input_data)

    return prediction[0]