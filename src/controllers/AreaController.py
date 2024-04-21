from fastapi import APIRouter

from src.models.AreaModels import AreasFavoriteModel
from src.services.AreaService import AreaService

area_router = APIRouter()
area_service = AreaService()


@area_router.get('/areas/{user_id}')
def get_areas_for_user(user_id: int):
    return area_service.get_areas(user_id)


@area_router.get('/areas/active/{user_id}')
def get_active_areas_for_user(user_id: int):
    return area_service.get_active_areas(user_id)


@area_router.get('/areas/favorite/{user_id}')
def get_favorite_areas_for_user(user_id: int):
    return area_service.get_favorite_areas(user_id)


@area_router.get('/areas/custom/{user_id}')
def get_custom_areas_for_user(user_id: int):
    return area_service.get_custom_areas(user_id)


@area_router.post('/areas/activate/{user_id}/{area_name}')
def activate_area_for_user(user_id: int, area_name: str):
    area_service.activate_area(area_name, user_id)


@area_router.post('/areas/deactivate/{user_id}/{area_name}')
def deactivate_area_for_user(user_id: int, area_name: str):
    area_service.deactivate_area(area_name, user_id)


@area_router.post('/areas/favorites/{user_id}')
def change_favorite_areas_for_user(user_id: int, areas_favorite: AreasFavoriteModel):
    area_service.change_favorite_areas(user_id, areas_favorite.areas)


@area_router.put('/areas/custom/{user_id}')
def create_custom_area(user_id: int):
    area_service.create_custom_area(user_id)

