from pydantic import BaseModel, Field


class DeviceInput(BaseModel):

    device_brand: str
    os: str

    screen_size: float = Field(gt=0)

    four_g: str
    five_g: str

    rear_camera_mp: float = Field(ge=0)
    front_camera_mp: float = Field(ge=0)

    internal_memory: float = Field(gt=0)
    ram: float = Field(gt=0)
    battery: float = Field(gt=0)
    weight: float = Field(gt=0)

    release_year: int = Field(ge=2000)
    days_used: int = Field(ge=0)

    normalized_new_price: float = Field(gt=0)


class PredictionResponse(BaseModel):
    predicted_normalized_used_price: float
    unit: str
    note: str