from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.service_provider import ServiceProvider
from app.models.user import User
from app.saml.assertion import generate_assertion
from app.saml.crypto import verify_xml_assertion
from app.security.dependencies import get_current_user
from app.audit.logs import add_log

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


@router.post("/acs")
async def assertion_consumer_service(request: Request):
    """
    Assertion Consumer Service (ACS) Endpoint.
    Receives incoming signed SAML Assertion XML, cryptographically verifies its
    X.509 digital signature with IdP's public certificate, enforces data integrity,
    and extracts authenticated identity claims.
    """
    body = await request.body()
    xml_str = body.decode("utf-8")

    if not xml_str.strip():
        raise HTTPException(status_code=400, detail="Empty SAML Assertion payload.")

    is_valid, verified_xml = verify_xml_assertion(xml_str)

    if not is_valid:
        add_log("SAML ACS Verification", "Blocked")
        raise HTTPException(
            status_code=400,
            detail=f"Cryptographic Signature Verification Failed: {verified_xml}"
        )

    # Extract claims from verified XML element
    email = None
    role = None
    department = None

    nameid = verified_xml.xpath("//Subject/NameID")
    if nameid:
        email = nameid[0].text

    role_attr = verified_xml.xpath("//Attribute[@Name='Role']/AttributeValue")
    if role_attr:
        role = role_attr[0].text

    dept_attr = verified_xml.xpath("//Attribute[@Name='Department']/AttributeValue")
    if dept_attr:
        department = dept_attr[0].text

    add_log("SAML ACS Verification", "Passed")

    return {
        "status": "verified",
        "message": "SAML Assertion cryptographically verified successfully.",
        "claims": {
            "email": email,
            "role": role,
            "department": department
        }
    }