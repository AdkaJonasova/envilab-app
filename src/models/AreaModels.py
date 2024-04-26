from pydantic import BaseModel


class FavoritePairModel(BaseModel):
    identificator: str
    value: bool


class AreasFavoriteModel(BaseModel):
    areas: list[FavoritePairModel]


class CreateCustomArea(BaseModel):
    title: str
    projection: str
    geojson: dict
