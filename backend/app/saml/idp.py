from saml2.server import Server

from app.saml.config import IDP_CONFIG


def get_idp():
    config = IDP_CONFIG

    server = Server(config=config)

    return server