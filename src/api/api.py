from src.repositories.LayerRepository import LayerRepository
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# repositories
layer_repo = LayerRepository()

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


@app.get('layers/{user_id}/{layer_id}')
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
