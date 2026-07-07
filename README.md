# 🛡️ SAMLGuard

> **Enterprise SAML 2.0 Identity Provider with Single Sign-On (SSO), JWT
> Authentication, Role-Based Access Control (RBAC), Security Attack
> Detection, and Audit Logging**

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![RBAC](https://img.shields.io/badge/RBAC-Role--Based%20Access-green)

------------------------------------------------------------------------

## 📖 Overview

SAMLGuard is a full-stack identity provider inspired by enterprise SSO
platforms. It authenticates users, generates SAML assertions, enforces
RBAC, detects common SAML attacks, and records security events.

## ✨ Features

-   JWT Authentication
-   Role-Based Access Control (Admin / HR / Employee)
-   SAML Assertion Generation
-   Single Sign-On workflow
-   Replay Attack Detection
-   XML Signature Wrapping Detection
-   Attribute Injection Detection
-   Audit Logs
-   React + FastAPI
-   PostgreSQL

## 🏗️ Architecture

``` mermaid
flowchart TD
A[User] --> B[React Frontend]
B --> C[FastAPI Backend]
C --> D[JWT Authentication]
D --> E[SAML Assertion Generator]
E --> F{Role}
F -->|Admin| G[Admin Dashboard]
F -->|HR| H[HR Dashboard]
F -->|Employee| I[Employee Dashboard]
G --> J[Audit Logs]
G --> K[Attack Lab]
C --> L[(PostgreSQL)]
```

## 🔐 RBAC

  Role        HR   Employee   Admin   Audit   Attack Lab
  ---------- ---- ---------- ------- ------- ------------
  Admin       ❌      ❌       ✅      ✅         ✅
  HR          ✅      ❌       ❌      ❌         ❌
  Employee    ❌      ✅       ❌      ❌         ❌

## 🚀 Run

### Backend

``` bash
cd backend
python -m venv .venv
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

## 📡 API

-   POST /auth/register
-   POST /auth/login
-   GET /users/me
-   GET /saml/login
-   POST /saml/replay
-   POST /saml/xsw
-   POST /saml/attribute-injection
-   GET /audit/logs

## 📂 Structure

``` text
SAMLGuard/
├── backend/
├── frontend/
├── screenshots/
└── README.md
```

## 👨‍💻 Author

**Manan Pathak**
