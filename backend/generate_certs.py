import os
import datetime
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CERTS_DIR = os.path.join(BASE_DIR, "certs")
PRIVATE_KEY_PATH = os.path.join(CERTS_DIR, "idp_private.pem")
PUBLIC_CERT_PATH = os.path.join(CERTS_DIR, "idp_public.crt")


def generate_idp_certificates(force: bool = False):
    """
    Generates a self-signed X.509 certificate pair for the SAML Identity Provider.
    Creates `idp_private.pem` and `idp_public.crt` inside `backend/certs/`.
    """
    os.makedirs(CERTS_DIR, exist_ok=True)

    if not force and os.path.exists(PRIVATE_KEY_PATH) and os.path.exists(PUBLIC_CERT_PATH):
        print(f"[=] IdP certificates already exist in {CERTS_DIR}.")
        return PRIVATE_KEY_PATH, PUBLIC_CERT_PATH

    print("[+] Generating 2048-bit RSA private key for IdP...")
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )

    print("[+] Generating self-signed X.509 certificate for IdP...")
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, "SAMLGuard Identity Provider"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "SAMLGuard Enterprise"),
        x509.NameAttribute(NameOID.COUNTRY_NAME, "US"),
    ])

    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(private_key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.datetime.now(datetime.timezone.utc))
        .not_valid_after(
            datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365)
        )
        .add_extension(
            x509.BasicConstraints(ca=True, path_length=None),
            critical=True,
        )
        .sign(private_key, hashes.SHA256())
    )

    print(f"[+] Writing private key to {PRIVATE_KEY_PATH}...")
    with open(PRIVATE_KEY_PATH, "wb") as f:
        f.write(
            private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption(),
            )
        )

    print(f"[+] Writing public certificate to {PUBLIC_CERT_PATH}...")
    with open(PUBLIC_CERT_PATH, "wb") as f:
        f.write(
            cert.public_bytes(
                encoding=serialization.Encoding.PEM,
            )
        )

    print("[OK] IdP X.509 certificate pair generated successfully!")
    return PRIVATE_KEY_PATH, PUBLIC_CERT_PATH


if __name__ == "__main__":
    generate_idp_certificates(force=True)
