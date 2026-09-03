import traceback
from fastapi import FastAPI
from sqlalchemy import text
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.saml import router as saml_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.replay import router as replay_router
from app.api.v1.xsw import router as xsw_router
from app.database.database import engine, SessionLocal
from app.api.v1.audit import router as audit_router
from app.api.v1.attribute_injection import router as attribute_router
from app.models.user import User
from app.models.role import Role

app = FastAPI(
    title="SAMLGuard API",
    version="1.0.0",
    description="Enterprise SAML 2.0 Identity Provider",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
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

@app.on_event("startup")
def on_startup():
    try:
        from app.saml.crypto import ensure_certificates_exist
        ensure_certificates_exist()
    except Exception as e:
        print("Certificate startup notification:", e)

    try:
        from seed import init_db
        init_db()
    except Exception as e:
        print("Startup seed notification:", e)

@app.get("/")
def root():
    return {
        "message": "Welcome to SAMLGuard"
    }

@app.get("/debug-db")
def debug_db():
    try:
        db = SessionLocal()
        users = db.query(User).all()
        roles = db.query(Role).all()
        db.close()
        return {
            "users": [{"id": u.id, "email": u.email, "role_id": u.role_id} for u in users],
            "roles": [{"id": r.id, "name": r.name} for r in roles]
        }
    except Exception as e:
        return {
            "error": str(e),
            "traceback": traceback.format_exc()
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