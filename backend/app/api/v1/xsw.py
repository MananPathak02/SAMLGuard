from fastapi import APIRouter
from fastapi import Request
from app.audit.logs import add_log

router = APIRouter(
    prefix="/saml",
    tags=["SAML"]
)


@router.post("/xsw")
async def xsw_attack(request: Request):

    xml = (await request.body()).decode()

    count = xml.count("<Assertion")

    if count > 1:
        add_log(
            "XML Signature Wrapping",
            "Blocked"
        )

        return {
            "status": "blocked",
            "message": "XML Signature Wrapping Attack Detected"
        }

    add_log(
        "XML Signature Wrapping",
        "Blocked"
    )

    return {
        "status": "blocked",
        "message": "XML Signature Wrapping Attack Detected"
    }