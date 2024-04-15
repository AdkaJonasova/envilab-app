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
