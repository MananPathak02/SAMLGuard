from fastapi import APIRouter
from fastapi import Request
from app.audit.logs import add_log
from app.saml.crypto import verify_xml_assertion

router = APIRouter(
    prefix="/saml",
    tags=["SAML"]
)


@router.post("/xsw")
async def xsw_attack(request: Request):
    xml = (await request.body()).decode()

    # 1. Check structural Signature Wrapping indicators
    count = xml.count("<Assertion")

    if count > 1:
        add_log(
            "XML Signature Wrapping",
            "Blocked"
        )
        return {
            "status": "blocked",
            "message": "XML Signature Wrapping Attack Detected (Multiple Assertions Found)"
        }

    # 2. Cryptographic signature verification
    is_valid, res = verify_xml_assertion(xml)
    if not is_valid:
        add_log(
            "XML Signature Wrapping",
            "Blocked"
        )
        return {
            "status": "blocked",
            "message": f"XML Signature Wrapping Detected: Signature Invalid ({res})"
        }

    add_log(
        "XML Signature Wrapping",
        "Safe"
    )

    return {
        "status": "safe",
        "message": "Valid Assertion Verified Cryptographically"
    }