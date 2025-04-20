from .users import router as users_router
from .matches import router as matches_router
from .predictions import router as predictions_router

router = users_router
matches_router = matches_router
predictions_router = predictions_router