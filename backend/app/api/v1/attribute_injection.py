from fastapi import APIRouter
from fastapi import Request
from lxml import etree
from app.audit.logs import add_log
from app.saml.crypto import verify_xml_assertion

router = APIRouter(
    prefix="/saml",
    tags=["SAML"]
)


@router.post("/attribute-injection")
async def attribute_injection(request: Request):
    xml = (await request.body()).decode()

    # 1. Cryptographic Signature & Digest Verification
    is_valid, res = verify_xml_assertion(xml)
    if not is_valid:
        add_log(
            "Attribute Injection",
            "Blocked"
        )
        return {
            "status": "blocked",
            "message": f"Attribute Injection Blocked: Cryptographic Signature Tampering Detected ({res})"
        }

    # 2. Extract claims from cryptographically verified element
    role = res.xpath(
        "//Attribute[@Name='Role']/AttributeValue"
    )

    if role:
        role_value = role[0].text

        if role_value != "Employee":
            add_log(
                "Attribute Injection",
                "Blocked"
            )

            return {
                "status": "blocked",
                "message": "Attribute Injection Attack Detected: Unauthorized Role Claim"
            }

    add_log(
        "Attribute Injection",
        "Safe"
    )

    return {
        "status": "safe",
        "message": "Valid Signed Assertion Verified"
    }