from pydantic import BaseModel


class LayerUpdateModel(BaseModel):
    opacity: int


class FavoritePairModel(BaseModel):
    name: str
    value: bool


class LayerFavoritesModel(BaseModel):
    layers: list[FavoritePairModel]


class ExtentResponseModel(BaseModel):
    minx: float
    miny: float
    maxx: float
    maxy: float


class LayerResponseModel(BaseModel):
    name: str
    title: str
    description: str
    projection: str
    extent: ExtentResponseModel
    isActive: bool
    isFavorite: bool
    opacity: int


class LayerGroupsResponseModel(BaseModel):
    name: str
    title: str
    description: str
    layers: list[LayerResponseModel]
