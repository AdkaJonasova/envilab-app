from typing import Optional

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


class ExtentResponseModel(BaseModel):
    minx: float
    miny: float
    maxx: float
    maxy: float


class AreaResponseModel(BaseModel):
    name: str
    title: str
    description: str
    projection: str
    extent: ExtentResponseModel
    isActive: bool
    isFavorite: bool
    isCustom: bool
    subAreas: Optional[list["AreaResponseModel"]] = []


AreaResponseModel.model_rebuild()
