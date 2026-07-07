# Assertion is an XML document containing the users identity

from datetime import datetime, timezone
from uuid import uuid4

from lxml import etree


def generate_assertion(email: str, role: str, department: str):

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

    return etree.tostring(
        assertion,
        pretty_print=True,
        encoding="unicode"
    )