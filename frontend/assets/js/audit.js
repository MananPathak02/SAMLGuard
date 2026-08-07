document.addEventListener("DOMContentLoaded", async () => {
    const logTableBody = document.getElementById("logTableBody");
    const backBtn = document.getElementById("backAdminBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "admin-dashboard.html";
        });
    }

    if (!logTableBody) return;

    try {
        const logs = await API.get("/audit/logs");

        if (!Array.isArray(logs) || logs.length === 0) {
            logTableBody.innerHTML = `
                <tr>
                    <td colSpan="3" style="text-align: center; padding: 2.5rem; color: var(--text-secondary);" class="font-mono">
                        No audit logs found.
                    </td>
                </tr>
            `;
            return;
        }

        let html = "";
        logs.forEach((log, index) => {
            const isBlocked = log.status === "Blocked";
            const badgeClass = isBlocked ? "badge-red" : "badge-teal";
            
            html += `
                <tr>
                    <td class="font-mono text-secondary" style="font-size: 0.75rem;">${index + 1}</td>
                    <td style="color: var(--text-primary);">${log.event || ""}</td>
                    <td>
                        <span class="badge ${badgeClass}">${log.status || "Recorded"}</span>
                    </td>
                </tr>
            `;
        });

        logTableBody.innerHTML = html;
    } catch (error) {
        console.error("Failed to load audit logs:", error);
        logTableBody.innerHTML = `
            <tr>
                <td colSpan="3" style="text-align: center; padding: 2.5rem; color: var(--accent-red);" class="font-mono">
                    Failed to fetch audit logs from server.
                </td>
            </tr>
        `;
    }
});
