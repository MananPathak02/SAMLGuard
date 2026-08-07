async function loadDashboardUser(requiredRole) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        window.location.replace("login.html");
        return;
    }

    if (requiredRole && role !== requiredRole) {
        window.location.replace("403.html");
        return;
    }

    try {
        const user = await API.get("/users/me");
        
        // Populate user details across dashboard pages
        const nameEls = document.querySelectorAll(".user-fullname");
        nameEls.forEach(el => el.textContent = `${user.first_name || ''} ${user.last_name || ''}`);

        const emailEl = document.getElementById("userEmail");
        if (emailEl) emailEl.textContent = user.email || "";

        const deptEl = document.getElementById("userDept");
        if (deptEl) deptEl.textContent = user.department || "N/A";

        const roleEl = document.getElementById("userRole");
        if (roleEl) roleEl.textContent = user.role?.name || role || "";

        const loadingOverlay = document.getElementById("loadingDashboard");
        const dashboardContent = document.getElementById("dashboardContent");

        if (loadingOverlay) loadingOverlay.style.display = "none";
        if (dashboardContent) dashboardContent.style.display = "block";
    } catch (error) {
        console.error("Failed to load user session:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("assertion");
        window.location.replace("login.html");
    }
}

function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("assertion");
    window.location.href = "index.html";
}
