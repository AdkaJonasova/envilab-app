from src.controllers.AreaController import area_router
from src.controllers.LayerController import layer_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# fast API
app = FastAPI(
    docs_url="/api-documentation",
    redoc_url="/redoc-api-documentation",
    title="EnviMap application",
    version="0.0.1",
    description="REST API for working with layers and areas from the GeoServer and an additional information stored "
                "in the database."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(layer_router)
app.include_router(area_router)
