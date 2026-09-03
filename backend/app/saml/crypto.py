import os
import sys
from lxml import etree
from signxml import XMLSigner, XMLVerifier, methods
from signxml.exceptions import InvalidSignature, InvalidDigest, InvalidCertificate

# Add backend directory to sys.path if not present
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from generate_certs import generate_idp_certificates, PRIVATE_KEY_PATH, PUBLIC_CERT_PATH


def ensure_certificates_exist():
    """Ensure IdP X.509 certificate pair exists, generating if missing."""
    if not (os.path.exists(PRIVATE_KEY_PATH) and os.path.exists(PUBLIC_CERT_PATH)):
        generate_idp_certificates()


def load_private_key_bytes() -> bytes:
    ensure_certificates_exist()
    with open(PRIVATE_KEY_PATH, "rb") as f:
        return f.read()


def load_public_cert_bytes() -> bytes:
    ensure_certificates_exist()
    with open(PUBLIC_CERT_PATH, "rb") as f:
        return f.read()


def sign_xml_assertion(xml_input) -> str:
    """
    Cryptographically signs an XML assertion using signxml (enveloped signature).
    Accepts etree.Element or XML string/bytes and returns signed XML string.
    """
    ensure_certificates_exist()
    key_pem = load_private_key_bytes()
    cert_pem = load_public_cert_bytes()

    if isinstance(xml_input, str):
        root = etree.fromstring(xml_input.encode("utf-8"))
    elif isinstance(xml_input, bytes):
        root = etree.fromstring(xml_input)
    else:
        root = xml_input

    assertion_id = root.get("ID")

    signer = XMLSigner(
        method=methods.enveloped,
        signature_algorithm="rsa-sha256",
        digest_algorithm="sha256"
    )

    signed_root = signer.sign(
        root,
        key=key_pem,
        cert=cert_pem,
        reference_uri=assertion_id
    )

    return etree.tostring(
        signed_root,
        encoding="unicode"
    )


def verify_xml_assertion(xml_input, x509_cert: bytes = None):
    """
    Verifies the cryptographic XML signature of a SAML assertion using signxml.XMLVerifier.
    Returns tuple: (is_valid: bool, verified_element_or_error_msg: etree.Element | str)
    """
    ensure_certificates_exist()
    if x509_cert is None:
        x509_cert = load_public_cert_bytes()

    if isinstance(xml_input, str):
        xml_bytes = xml_input.encode("utf-8")
    elif isinstance(xml_input, bytes):
        xml_bytes = xml_input
    elif hasattr(xml_input, "tag"):
        xml_bytes = etree.tostring(xml_input)
    else:
        return False, "Invalid XML input format"

    try:
        root = etree.fromstring(xml_bytes)
    except etree.XMLSyntaxError as e:
        return False, f"XML Parsing Error: {str(e)}"

    verifier = XMLVerifier()
    try:
        result = verifier.verify(
            root,
            x509_cert=x509_cert,
            id_attribute="ID",
            validate_schema=False
        )
        return True, result.signed_xml
    except InvalidSignature as e:
        return False, f"Invalid Digital Signature: {str(e)}"
    except InvalidDigest as e:
        return False, f"XML Digest Mismatch / Payload Tampered: {str(e)}"
    except InvalidCertificate as e:
        return False, f"Untrusted / Invalid X.509 Certificate: {str(e)}"
    except Exception as e:
        return False, f"Signature Verification Failure: {str(e)}"
