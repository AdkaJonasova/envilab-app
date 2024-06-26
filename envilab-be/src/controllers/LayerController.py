from fastapi import APIRouter

from src.models.LayerModels import LayerFavoritesModel, LayerUpdateModel, LayerGroupsResponseModel
from src.services.LayerService import LayerService

layer_router = APIRouter()
layer_service = LayerService()


@layer_router.get('/layers/{user_id}', tags=["Layers"], response_model=list[LayerGroupsResponseModel])
def get_layers_for_user(user_id: int):
    return layer_service.get_layers(user_id)


@layer_router.get('/layers/favorite/{user_id}', tags=["Layers"], response_model=list[LayerGroupsResponseModel])
def get_favorite_layers_for_user(user_id: int):
    return layer_service.get_favorite_layers(user_id)


@layer_router.get('/layers/active/{user_id}', tags=["Layers"], response_model=list[LayerGroupsResponseModel])
def get_active_layers_for_user(user_id: int):
    return layer_service.get_active_layers(user_id)


@layer_router.post('/layers/activate/{user_id}/{layer_name}', tags=["Layers"])
def activate_layer_for_user(user_id: int, layer_name: str):
    layer_service.activate_layer(layer_name, user_id)


@layer_router.post('/layers/deactivate/{user_id}/{layer_name}', tags=["Layers"])
def deactivate_layer_for_user(user_id: int, layer_name: str):
    layer_service.deactivate_layer(layer_name, user_id)


@layer_router.post('/layers/favorites/{user_id}', tags=["Layers"])
def change_favorite_layers_for_user(user_id: int, layers_favorite: LayerFavoritesModel):
    layer_service.change_favorite_layers(user_id, layers_favorite.layers)


@layer_router.post('/layers/setOpacity/{user_id}/{layer_name}', tags=["Layers"])
def set_opacity_of_layer_for_user(user_id: int, layer_name: str, layer_update: LayerUpdateModel):
    layer_service.set_opacity_of_layer(layer_name, user_id, layer_update.opacity)
