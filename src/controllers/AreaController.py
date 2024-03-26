from fastapi import APIRouter

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

# @router.post('/areas/activate/{user_id}/{area_id}')
# def activate_area_for_user(user_id: int, area_id: int):
#     area_repo.activate_area_for_user(user_id, area_id)
#
#
# @router.post('/areas/deactivate/{user_id}/{area_id}')
# def deactivate_area_for_user(user_id: int, area_id):
#     area_repo.deactivate_area_for_user(user_id, area_id)
#
#
# @app.post('/areas/addFavorite/{user_id}/{area_id}')
# def add_area_to_favorites_for_user(user_id: int, area_id: int):
#     area_repo.add_favorite_for_user(user_id, area_id)
#
#
# @router.post('/areas/removeFavorite/{user_id}/{area_id}')
# def remove_area_from_favorites_for_user(user_id: int, area_id: int):
#     area_repo.remove_favorite_for_user(user_id, area_id)
#
#
# @router.post('/areas/addCustom/{user_id}/{area_id}')
# def add_area_to_custom_for_user(user_id: int, area_id: int):
#     area_repo.add_custom_for_user(user_id, area_id)
#
#
# @router.post('/areas/removeCustom/{user_id}/{area_id}')
# def remove_area_from_custom_for_user(user_id: int, area_id: int):
#     area_repo.remove_custom_for_user(user_id, area_id)
