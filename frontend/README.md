# 🛡️ SAMLGuard Frontend (HTML, CSS, JS)

Standard HTML5, CSS3, and JavaScript (ES6+) frontend for SAMLGuard Identity Provider and SSO Service Provider portals.

## 🚀 Quick Start

Open `index.html` directly in any web browser, or serve it using any static web server:

### Option 1: Python HTTP Server
```bash
python -m http.server 5173
```

### Option 2: Live Server (VS Code Extension)
Right click `index.html` and select **Open with Live Server**.

## 📁 File Structure

- `index.html` - Identity Provider landing page
- `login.html` - Identity Provider login & assertion generator
- `admin-portal.html` & `admin-dashboard.html` - Security Administration Console
- `hr-portal.html` & `hr-dashboard.html` - HR Portal & Dashboard
- `employee-portal.html` & `employee-dashboard.html` - Employee Self-Service Portal & Dashboard
- `attack-lab.html` - SAML Replay, XSW, and Attribute Injection attack testing simulator
- `assertion-viewer.html` - SAML XML assertion viewer
- `audit-logs.html` - Security Audit Logs
- `company-wiki.html` - Company Wiki documentation
- `employee-directory.html` - Employee Directory with live search
- `403.html` & `404.html` - Access Denied and Not Found pages
- `assets/css/style.css` - Custom dark mode theme & responsive layout system
- `assets/js/api.js` & `assets/js/config.js` - FastAPI backend integration with JWT authentication header
- `assets/js/navbar.js` - Dynamic header & RBAC navigation bar
