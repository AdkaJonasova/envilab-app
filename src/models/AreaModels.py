from pydantic import BaseModel


class FavoritePairModel(BaseModel):
    identificator: str
    value: bool


class AreasFavoriteModel(BaseModel):
    areas: list[FavoritePairModel]


class CreateCustomArea(BaseModel):
    title: str
    geojson: dict
