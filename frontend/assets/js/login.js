document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");
    const loginBtn = document.getElementById("loginBtn");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        errorMessage.style.display = "none";
        errorMessage.textContent = "";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            errorMessage.textContent = "Please provide both email and password";
            errorMessage.style.display = "block";
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = "Authenticating...";

        try {
            // 1. Authenticate
            const loginResponse = await API.post("/auth/login", { email, password });
            const token = loginResponse.access_token;
            localStorage.setItem("token", token);

            // 2. Fetch User Profile
            const user = await API.get("/users/me");

            // 3. Generate SAML Assertion
            const samlResponse = await API.get("/saml/login?sp=hr-portal");
            localStorage.setItem("assertion", typeof samlResponse === "string" ? samlResponse : JSON.stringify(samlResponse));
            localStorage.setItem("role", user.role.name);

            // 4. Redirect based on role
            switch (user.role.name) {
                case "Admin":
                    window.location.href = "admin-dashboard.html";
                    break;
                case "HR":
                    window.location.href = "hr-dashboard.html";
                    break;
                case "Employee":
                    window.location.href = "employee-dashboard.html";
                    break;
                default:
                    window.location.href = "index.html";
            }
        } catch (error) {
            console.error("Login failed:", error);
            let message = "Invalid email or password";
            if (error.status === 401) {
                message = "Invalid email or password";
            } else if (error.data && error.data.detail) {
                message = typeof error.data.detail === "string" ? error.data.detail : JSON.stringify(error.data.detail);
            } else if (error.message) {
                message = error.message;
            }
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
            loginBtn.disabled = false;
            loginBtn.textContent = "Authenticate →";
        }
    });
});
