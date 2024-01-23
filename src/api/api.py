from typing import List

from src.repositories.AreaRepository import AreaRepository
from src.repositories.AreaSetRepository import AreaSetRepository
from src.repositories.LayerRepository import LayerRepository
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

# repositories
layer_repo = LayerRepository()
area_repo = AreaRepository()
area_set_repo = AreaSetRepository()

# fast API
app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:3000/layerView",
    "localhost:3000/layerView"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# LAYERS
@app.get('/layers/favorite/{user_id}')
def get_favorite_layers_for_user(user_id: int):
    return layer_repo.get_all_favorite_for_user(user_id)


@app.get('/layers/{user_id}')
def get_layers_for_user(user_id: int):
    return layer_repo.get_all_for_user(user_id)


@app.get('/layers/active/{user_id}')
def get_active_layers_for_user(user_id: int):
    return layer_repo.get_all_active_for_user(user_id)


@app.get('layers/{user_id}/{}')
def get_layer(user_id: int, layer_id: int):
    return layer_repo.get_layer_by_id_and_user(layer_id, user_id)


@app.post('/layers/activate/{user_id}/{layer_id}')
def activate_layer_for_user(user_id: int, layer_id: int):
    layer_repo.activate_layer_for_user(layer_id, user_id)


@app.post('/layers/deactivate/{user_id}/{layer_id}')
def activate_layer_for_user(user_id: int, layer_id: int):
    layer_repo.deactivate_layer_for_user(layer_id, user_id)


@app.post('/layers/addFavorite/{user_id}/{layer_id}')
def add_layer_to_favorites_for_user(user_id: int, layer_id: int):
    layer_repo.add_layer_to_favorites_for_user(layer_id, user_id)


@app.post('/layers/removeFavorite/{user_id}/{layer_id}')
def remove_layer_from_favorites_for_user(user_id: int, layer_id: int):
    layer_repo.remove_layer_from_favorites_for_user(layer_id, user_id)


# AREAS
@app.get('/areas/{user_id}')
def get_areas_for_user(user_id: int):
    return area_repo.get_areas_for_user(user_id)


@app.get('/areas/active/{user_id}')
def get_active_areas_for_user(user_id: int):
    return area_repo.get_areas_for_user(user_id)


@app.get('/areas/favorite/{user_id}')
def get_favorite_areas_for_user(user_id: int):
    return area_repo.get_favorite_areas_for_user(user_id)


@app.get('/areas/custom/{user_id}')
def get_custom_areas_for_user(user_id: int):
    return area_repo.get_custom_areas_for_user(user_id)


@app.post('/areas/activate/{user_id}/{area_id}')
def activate_area_for_user(user_id: int, area_id: int):
    area_repo.activate_area_for_user(user_id, area_id)


@app.post('/areas/deactivate/{user_id}/{area_id}')
def deactivate_area_for_user(user_id: int, area_id):
    area_repo.deactivate_area_for_user(user_id, area_id)


@app.post('/areas/addFavorite/{user_id}/{area_id}')
def add_area_to_favorites_for_user(user_id: int, area_id: int):
    area_repo.add_favorite_for_user(user_id, area_id)


@app.post('/areas/removeFavorite/{user_id}/{area_id}')
def remove_area_from_favorites_for_user(user_id: int, area_id: int):
    area_repo.remove_favorite_for_user(user_id, area_id)


@app.post('/areas/addCustom/{user_id}/{area_id}')
def add_area_to_custom_for_user(user_id: int, area_id: int):
    area_repo.add_custom_for_user(user_id, area_id)


@app.post('/areas/removeCustom/{user_id}/{area_id}')
def remove_area_from_custom_for_user(user_id: int, area_id: int):
    area_repo.remove_custom_for_user(user_id, area_id)


# AREA SETS
@app.get('/areaSets')
def get_area_sets():
    return area_set_repo.get_area_sets()


@app.get('/areaSets/areas/{area_set_id}')
def get_areas_in_area_set(area_set_id: int):
    return area_set_repo.get_areas_in_set(area_set_id)


@app.get('/areaSets/{area_id}')
def get_area_sets_for_area(area_id: int):
    return area_set_repo.get_area_sets_for_area(area_id)


@app.post('/areaSets/addArea/{area_set_id}/{area_id}')
def add_area_to_area_set(area_set_id: int, area_id: int):
    area_set_repo.add_area_to_set(area_id, area_set_id)


@app.post('/areaSets/removeArea/{area_set_id}/{area_id}')
def remove_area_from_area_set(area_set_id: int, area_id: int):
    area_set_repo.remove_area_from_set(area_id, area_set_id)


@app.put('/areaSets/new')
def create_area_set(name: str, areas: List[int] = Query(None)):
    area_set_repo.create_area_set(name, areas)
