from lxml import etree


def generate_metadata():

    entity = etree.Element("EntityDescriptor")

    entity.set(
        "entityID",
        "http://localhost:8000/saml/metadata"
    )

    idp = etree.SubElement(
        entity,
        "IDPSSODescriptor"
    )

    sso = etree.SubElement(
        idp,
        "SingleSignOnService"
    )

    sso.set(
        "Binding",
        "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
    )

    sso.set(
        "Location",
        "http://localhost:8000/saml/sso"
    )

    return etree.tostring(
        entity,
        pretty_print=True,
        encoding="unicode"
    )