const API = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem("token");
        const headers = {
            ...options.headers
        };

        if (token && !headers["Authorization"]) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        if (options.body && typeof options.body === "object" && !(options.body instanceof FormData) && headers["Content-Type"] !== "application/xml") {
            headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(options.body);
        }

        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const contentType = response.headers.get("content-type") || "";

        let data;
        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const error = new Error(`Request failed with status ${response.status}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return data;
    },

    get(endpoint, headers = {}) {
        return this.request(endpoint, { method: "GET", headers });
    },

    post(endpoint, body, headers = {}) {
        return this.request(endpoint, { method: "POST", body, headers });
    }
};
