# Assertion is an XML document containing the user's identity
from datetime import datetime, timezone
from uuid import uuid4
from lxml import etree

from app.saml.crypto import sign_xml_assertion


def generate_assertion(email: str, role: str, department: str) -> str:
    """
    Generates a SAML 2.0 Assertion XML element containing the user's identity claims,
    and cryptographically signs it with the IdP's RSA private key and X.509 certificate.
    """
    assertion = etree.Element("Assertion")

    assertion.set("ID", "_" + str(uuid4()))
    assertion.set("Version", "2.0")
    assertion.set(
        "IssueInstant",
        datetime.now(timezone.utc).isoformat()
    )

    issuer = etree.SubElement(assertion, "Issuer")
    issuer.text = "SAMLGuard"

    subject = etree.SubElement(assertion, "Subject")

    nameid = etree.SubElement(subject, "NameID")
    nameid.text = email

    attributes = etree.SubElement(
        assertion,
        "AttributeStatement"
    )

    role_attr = etree.SubElement(
        attributes,
        "Attribute",
        Name="Role"
    )

    etree.SubElement(
        role_attr,
        "AttributeValue"
    ).text = role

    dept_attr = etree.SubElement(
        attributes,
        "Attribute",
        Name="Department"
    )

    etree.SubElement(
        dept_attr,
        "AttributeValue"
    ).text = department

    # Cryptographically sign assertion using signxml & IdP private key
    signed_xml_str = sign_xml_assertion(assertion)
    return signed_xml_str