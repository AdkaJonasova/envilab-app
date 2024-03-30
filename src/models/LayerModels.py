from pydantic import BaseModel


class LayerUpdateModel(BaseModel):
    opacity: int


class FavoritePairModel(BaseModel):
    name: str
    value: bool


class LayerFavoritesModel(BaseModel):
    layers: list[FavoritePairModel]
