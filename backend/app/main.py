from fastapi import FastAPI
from sqlalchemy import text
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.saml import router as saml_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.replay import router as replay_router
from app.api.v1.xsw import router as xsw_router
from app.database.database import engine
from app.api.v1.audit import router as audit_router
from app.api.v1.attribute_injection import router as attribute_router

app = FastAPI(
    title="SAMLGuard API",
    version="1.0.0",
    description="Enterprise SAML 2.0 Identity Provider",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
        "http://127.0.0.1:8080",
        "http://localhost:8080",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(saml_router)
app.include_router(replay_router)
app.include_router(xsw_router)
app.include_router(attribute_router)
app.include_router(audit_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to SAMLGuard"
    }


@app.get("/health")
def health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": str(e)
        }