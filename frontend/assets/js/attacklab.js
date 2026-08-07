document.addEventListener("DOMContentLoaded", () => {
    const replayBtn = document.getElementById("replayBtn");
    const xswBtn = document.getElementById("xswBtn");
    const attrBtn = document.getElementById("attrBtn");

    const replayStatus = document.getElementById("replayStatus");
    const xswStatus = document.getElementById("xswStatus");
    const attrStatus = document.getElementById("attrStatus");

    const getAssertion = () => localStorage.getItem("assertion") || "";

    if (replayBtn) {
        replayBtn.addEventListener("click", async () => {
            replayStatus.textContent = "Simulating...";
            try {
                const response = await API.post("/saml/replay", getAssertion(), {
                    "Content-Type": "application/xml"
                });
                replayStatus.textContent = typeof response === "object" ? response.message : response;
            } catch (error) {
                replayStatus.textContent = error.data?.detail || "Replay Attack Blocked";
            }
        });
    }

    if (xswBtn) {
        xswBtn.addEventListener("click", async () => {
            xswStatus.textContent = "Simulating...";
            try {
                const response = await API.post("/saml/xsw", getAssertion(), {
                    "Content-Type": "application/xml"
                });
                xswStatus.textContent = typeof response === "object" ? response.message : response;
            } catch (error) {
                xswStatus.textContent = error.data?.detail || "XML Signature Wrapping Detected";
            }
        });
    }

    if (attrBtn) {
        attrBtn.addEventListener("click", async () => {
            attrStatus.textContent = "Simulating...";
            try {
                const modifiedAssertion = getAssertion().replace("Employee", "Admin");
                const response = await API.post("/saml/attribute-injection", modifiedAssertion, {
                    "Content-Type": "application/xml"
                });
                attrStatus.textContent = typeof response === "object" ? response.message : response;
            } catch (error) {
                attrStatus.textContent = error.data?.detail || "Attribute Injection Detected";
            }
        });
    }
});
