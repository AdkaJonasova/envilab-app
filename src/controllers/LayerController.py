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

# @router.get('/layers/{user_id}/{layer_id}')
# def get_layer(user_id: int, layer_id: int):
#     return layer_service.(layer_id, user_id)
#
#
# @router.post('/layers/activate/{user_id}/{layer_id}')
# def activate_layer_for_user(user_id: int, layer_id: int):
#     layer_repo.activate_layer_for_user(layer_id, user_id)
#
#
# @router.post('/layers/deactivate/{user_id}/{layer_id}')
# def activate_layer_for_user(user_id: int, layer_id: int):
#     layer_repo.deactivate_layer_for_user(layer_id, user_id)
#
#
# @router.post('/layers/addFavorite/{user_id}/{layer_id}')
# def add_layer_to_favorites_for_user(user_id: int, layer_id: int):
#     layer_repo.add_layer_to_favorites_for_user(layer_id, user_id)
#
#
# @router.post('/layers/removeFavorite/{user_id}/{layer_id}')
# def remove_layer_from_favorites_for_user(user_id: int, layer_id: int):
#     layer_repo.remove_layer_from_favorites_for_user(layer_id, user_id)
