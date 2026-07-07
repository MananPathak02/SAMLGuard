from fastapi import APIRouter
from fastapi import Request
from lxml import etree
from app.audit.logs import add_log

router = APIRouter(
    prefix="/saml",
    tags=["SAML"]
)


@router.post("/attribute-injection")
async def attribute_injection(request: Request):

    xml = (await request.body()).decode()

    root = etree.fromstring(xml.encode())

    role = root.xpath(
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
            "status":"blocked",
            "message":"Attribute Injection Attack Detected"
        }

    add_log(
        "Attribute Injection",
        "Safe"
    )

    return {
        "status":"safe",
        "message":"Valid Assertion"
    }