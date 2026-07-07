from fastapi import APIRouter

from app.audit.logs import get_logs

router = APIRouter(
    prefix="/audit",
    tags=["Audit"]
)


@router.get("/logs")
def audit_logs():

    return get_logs()