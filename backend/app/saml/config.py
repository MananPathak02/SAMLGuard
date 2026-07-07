from saml2 import BINDING_HTTP_POST
from saml2.config import IdPConfig

IDP_CONFIG = {
    "entityid": "http://localhost:8000/saml/metadata",

    "service": {
        "idp": {
            "name": "SAMLGuard Identity Provider",

            "endpoints": {
                "single_sign_on_service": [
                    (
                        "http://localhost:8000/saml/sso",
                        BINDING_HTTP_POST,
                    )
                ]
            }
        }
    },

    "debug": 1,
}