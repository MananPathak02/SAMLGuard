document.addEventListener("DOMContentLoaded", () => {
    const rawXmlEl = document.getElementById("rawXml");
    const copyXmlBtn = document.getElementById("copyXmlBtn");
    const backBtn = document.getElementById("backDashboardBtn");

    const xml = localStorage.getItem("assertion");
    const role = localStorage.getItem("role");

    if (!xml) {
        if (role === "Admin") window.location.href = "admin-dashboard.html";
        else if (role === "HR") window.location.href = "hr-dashboard.html";
        else window.location.href = "employee-dashboard.html";
        return;
    }

    if (rawXmlEl) rawXmlEl.textContent = xml;

    if (copyXmlBtn) {
        copyXmlBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(xml).then(() => {
                const origText = copyXmlBtn.textContent;
                copyXmlBtn.textContent = "Copied!";
                setTimeout(() => copyXmlBtn.textContent = origText, 2000);
            });
        });
    }

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            if (role === "Admin") window.location.href = "admin-dashboard.html";
            else if (role === "HR") window.location.href = "hr-dashboard.html";
            else window.location.href = "employee-dashboard.html";
        });
    }
});
