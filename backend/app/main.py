from fastapi import FastAPI

app = FastAPI(
    title="SAMLGuard API",
    version="1.0.0",
    description="Enterprise SAML 2.0 Identity Provider"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to SAMLGuard"
    }