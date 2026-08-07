function renderNavbar() {
    const navbarContainer = document.getElementById("navbar");
    if (!navbarContainer) return;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const currentPath = window.location.pathname;

    function isActive(path) {
        if (path === "index.html" || path === "/") {
            return currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "";
        }
        return currentPath.includes(path);
    }

    let links = [
        { href: "index.html", label: "Home" },
        { href: "login.html", label: "Login" },
        { href: "index.html#service-providers", label: "Service Providers" }
    ];

    if (token) {
        if (role === "Admin") {
            links = [
                { href: "index.html", label: "Home" },
                { href: "admin-dashboard.html", label: "Dashboard" },
                { href: "index.html#service-providers", label: "Service Providers" },
                { href: "assertion-viewer.html", label: "Assertion" },
                { href: "audit-logs.html", label: "Audit Logs" }
            ];
        } else if (role === "HR") {
            links = [
                { href: "index.html", label: "Home" },
                { href: "hr-dashboard.html", label: "Dashboard" },
                { href: "index.html#service-providers", label: "Service Providers" },
                { href: "assertion-viewer.html", label: "Assertion" }
            ];
        } else if (role === "Employee") {
            links = [
                { href: "index.html", label: "Home" },
                { href: "employee-dashboard.html", label: "Dashboard" },
                { href: "index.html#service-providers", label: "Service Providers" },
                { href: "assertion-viewer.html", label: "Assertion" }
            ];
        }
    }

    let navHtml = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="brand-logo">SAML<span>Guard</span></a>
                <div class="nav-links">
    `;

    links.forEach(link => {
        const activeClass = isActive(link.href) ? "active" : "";
        navHtml += `<a href="${link.href}" class="nav-link ${activeClass}">${link.label}</a>`;
    });

    if (token && role === "Admin") {
        const attackActive = isActive("attack-lab.html") ? "active" : "";
        navHtml += `<a href="attack-lab.html" class="nav-link nav-link-attack ${attackActive}">Attack Lab</a>`;
    }

    if (token) {
        navHtml += `<button id="navLogoutBtn" class="btn-logout">Logout</button>`;
    }

    navHtml += `
                </div>
            </div>
        </nav>
    `;

    navbarContainer.innerHTML = navHtml;

    const logoutBtn = document.getElementById("navLogoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("assertion");
            window.location.href = "index.html";
        });
    }
}

document.addEventListener("DOMContentLoaded", renderNavbar);
