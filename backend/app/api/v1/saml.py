from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi.responses import Response
from app.security.dependencies import get_current_user
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.service_provider import ServiceProvider
from app.models.user import User
from app.saml.assertion import generate_assertion

router = APIRouter(
    prefix="/saml",
    tags=["SAML"]
)


@router.get("/login")
def saml_login(
    sp: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    service_provider = db.query(ServiceProvider).filter(
        ServiceProvider.entity_id == sp
    ).first()

    if service_provider is None:
        raise HTTPException(
            status_code=404,
            detail="Service Provider not found."
        )

    xml = generate_assertion(
        email=current_user.email,
        role=current_user.role.name,
        department=current_user.department
    )

    return Response(
        content=xml,
        media_type="application/xml"
    )