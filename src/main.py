from src.repositories.LayerRepository import LayerRepository
from fastapi import FastAPI

# repositories
layer_repo = LayerRepository()

# fast API
app = FastAPI()


@app.get('/layers/favorite/{user_id}')
def get_favorite_layers_for_user(user_id: int):
    return layer_repo.get_all_favorite_for_user(user_id)


@app.get('/layers/{user_id}')
def get_layers_for_user(user_id: int):
    return layer_repo.get_all_for_user(user_id)


@app.post('/layers/activate/{user_id}/{layer_id}')
def activate_layer_for_user(user_id: int, layer_id: int):
    layer_repo.activate_layer_for_user(layer_id, user_id)
