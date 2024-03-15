from src.controllers.AreaController import area_router
from src.controllers.LayerController import layer_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# fast API
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(layer_router)
app.include_router(area_router)

# AREA SETS
# @app.get('/areaSets')
# def get_area_sets():
#     return area_set_repo.get_area_sets()
#
#
# @app.get('/areaSets/areas/{area_set_id}')
# def get_areas_in_area_set(area_set_id: int):
#     return area_set_repo.get_areas_in_set(area_set_id)
#
#
# @app.get('/areaSets/{area_id}')
# def get_area_sets_for_area(area_id: int):
#     return area_set_repo.get_area_sets_for_area(area_id)
#
#
# @app.post('/areaSets/addArea/{area_set_id}/{area_id}')
# def add_area_to_area_set(area_set_id: int, area_id: int):
#     area_set_repo.add_area_to_set(area_id, area_set_id)
#
#
# @app.post('/areaSets/removeArea/{area_set_id}/{area_id}')
# def remove_area_from_area_set(area_set_id: int, area_id: int):
#     area_set_repo.remove_area_from_set(area_id, area_set_id)
#
#
# @app.put('/areaSets/new')
# def create_area_set(name: str, areas: List[int] = Query(None)):
#     area_set_repo.create_area_set(name, areas)
