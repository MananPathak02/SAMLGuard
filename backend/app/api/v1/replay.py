from fastapi import APIRouter
from fastapi import Request
from app.audit.logs import add_log

router = APIRouter(
    prefix="/saml",
    tags=["SAML"]
)

used_assertions = set()


@router.post("/replay")
async def replay(request: Request):

    xml = (await request.body()).decode()

    if xml in used_assertions:

        add_log(
            "Replay Attack",
            "Blocked"
        )

        return {
            "status": "blocked",
            "message": "Replay Attack Detected"
        }

    used_assertions.add(xml)

    add_log(
        "Replay Attack",
        "Safe"
    )

    return {
        "status":"safe",
        "message":"Assertion Accepted"
    }