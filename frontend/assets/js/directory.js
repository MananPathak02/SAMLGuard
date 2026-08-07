document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchEmployees");
    const tableBody = document.getElementById("employeeTableBody");

    const employees = [
        { name: "Rahul Sharma", role: "HR", department: "Human Resources", email: "rahul@samlguard.com" },
        { name: "Priya Verma", role: "Employee", department: "Engineering", email: "priya@samlguard.com" },
        { name: "Arjun Singh", role: "Employee", department: "Cyber Security", email: "arjun@samlguard.com" },
        { name: "Amit Kapoor", role: "Admin", department: "IT Administration", email: "amit@samlguard.com" },
        { name: "Sneha Joshi", role: "Employee", department: "Finance", email: "sneha@samlguard.com" },
        { name: "Vivek Kumar", role: "Employee", department: "Operations", email: "vivek@samlguard.com" }
    ];

    function renderTable(filterText = "") {
        if (!tableBody) return;

        const term = filterText.toLowerCase().trim();
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(term) ||
            emp.role.toLowerCase().includes(term) ||
            emp.department.toLowerCase().includes(term) ||
            emp.email.toLowerCase().includes(term)
        );

        if (filtered.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colSpan="4" style="text-align: center; padding: 2rem; color: var(--text-secondary);" class="font-mono">
                        No matching employees found.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = filtered.map(emp => `
            <tr>
                <td style="color: var(--text-primary); font-weight: 500;">${emp.name}</td>
                <td class="text-teal font-mono">${emp.role}</td>
                <td style="color: var(--text-primary);">${emp.department}</td>
                <td class="text-secondary font-mono" style="font-size: 0.8125rem;">${emp.email}</td>
            </tr>
        `).join("");
    }

    renderTable();

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            renderTable(e.target.value);
        });
    }
});
