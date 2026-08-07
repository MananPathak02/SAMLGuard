function checkPortalSession(requiredRole) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const loadingEl = document.getElementById("checkingSession");
    const portalContent = document.getElementById("portalContent");

    if (!token) {
        if (loadingEl) loadingEl.style.display = "none";
        if (portalContent) portalContent.style.display = "block";
        return;
    }

    if (role === requiredRole) {
        if (requiredRole === "Admin") window.location.replace("admin-dashboard.html");
        else if (requiredRole === "HR") window.location.replace("hr-dashboard.html");
        else if (requiredRole === "Employee") window.location.replace("employee-dashboard.html");
    } else {
        window.location.replace("403.html");
    }
}
