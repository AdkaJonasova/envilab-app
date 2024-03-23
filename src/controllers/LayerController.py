from fastapi import APIRouter

from src.services.LayerService import LayerService

layer_router = APIRouter()
layer_service = LayerService()


@layer_router.get('/layers/favorite/{user_id}')
def get_favorite_layers_for_user(user_id: int):
    return layer_service.get_favorite_layers(user_id)


@layer_router.get('/layers/{user_id}')
def get_layers_for_user(user_id: int):
    return layer_service.get_layers(user_id)


@layer_router.get('/layers/active/{user_id}')
def get_active_layers_for_user(user_id: int):
    return layer_service.get_active_layers(user_id)


@layer_router.post('/layers/activate/{user_id}/{layer_name}')
def activate_layer_for_user(user_id: int, layer_name: str):
    layer_service.activate_layer(layer_name, user_id)


@layer_router.post('/layers/deactivate/{user_id}/{layer_name}')
def deactivate_layer_for_user(user_id: int, layer_name: str):
    layer_service.deactivate_layer(layer_name, user_id)


@layer_router.post('/layers/addFavorite/{user_id}/{layer_name}')
def add_layer_to_favorites_for_user(user_id: int, layer_name: str):
    layer_service.add_favorite_layer(layer_name, user_id)


@layer_router.post('/layers/removeFavorite/{user_id}/{layer_name}')
def remove_layer_from_favorites_for_user(user_id: int, layer_name: str):
    layer_service.remove_favorite_layer(layer_name, user_id)
