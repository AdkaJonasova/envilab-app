from pydantic import BaseModel


class FavoritePairModel(BaseModel):
    identificator: int
    value: bool


class AreasFavoriteModel(BaseModel):
    areas: list[FavoritePairModel]
