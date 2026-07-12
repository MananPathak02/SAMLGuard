import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

        // Login
        const loginResponse = await api.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

        const token = loginResponse.data.access_token;

        localStorage.setItem(
            "token",
            token
        );

        // Get current user
        const meResponse = await api.get(
            "/users/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const user = meResponse.data;

        // Generate SAML Assertion
        const samlResponse = await api.get(
            "/saml/login?sp=hr-portal",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        localStorage.setItem(
            "assertion",
            samlResponse.data
        );

        // Store role for Protected Routes
        localStorage.setItem(
            "role",
            user.role.name
        );

        // Redirect based on role
        switch (user.role.name) {

            case "Admin":
                navigate("/admin/dashboard");
                break;

            case "HR":
                navigate("/hr/dashboard");
                break;

            case "Employee":
                navigate("/employee/dashboard");
                break;

            default:
                navigate("/");
        }

    }

    catch (error) {

        console.log(error);

        setError("Invalid email or password");

    }

};

    return (

        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-6">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest text-[#4FD1C5] uppercase mb-3">
                        SAMLGuard
                    </p>
                    <h1 className="font-['IBM_Plex_Mono'] text-2xl font-bold text-[#E6EAF0]">
                        Identity Provider Login
                    </h1>
                    <p className="font-['IBM_Plex_Sans'] text-sm text-[#8A94A3] mt-3">
                        Authenticate to generate a SAML assertion
                    </p>
                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-8">

                    <form
                        onSubmit={handleLogin}
                        className="space-y-4"
                    >

                        <div>
                            <label className="block font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#8A94A3] mb-2">
                                Email
                            </label>
                            <input

                                type="email"

                                placeholder="you@company.com"

                                className="
                                w-full
                                bg-[#0B0F14]
                                border border-[#232B36]
                                rounded-md
                                p-3
                                text-sm
                                font-['IBM_Plex_Sans']
                                text-[#E6EAF0]
                                placeholder:text-[#8A94A3]/50
                                focus:outline-none
                                focus:border-[#4FD1C5]/60
                                "

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }

                            />
                        </div>

                        <div>
                            <label className="block font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#8A94A3] mb-2">
                                Password
                            </label>
                            <input

                                type="password"

                                placeholder="••••••••"

                                className="
                                w-full
                                bg-[#0B0F14]
                                border border-[#232B36]
                                rounded-md
                                p-3
                                text-sm
                                font-['IBM_Plex_Sans']
                                text-[#E6EAF0]
                                placeholder:text-[#8A94A3]/50
                                focus:outline-none
                                focus:border-[#4FD1C5]/60
                                "

                                value={password}

                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }

                            />
                        </div>

                        <button

                            className="
                            w-full
                            font-['IBM_Plex_Mono']
                            text-sm
                            font-semibold
                            bg-[#4FD1C5]
                            text-[#0B0F14]
                            rounded-md
                            p-3.5
                            mt-2
                            hover:bg-[#4FD1C5]/90
                            transition-colors
                            "

                        >

                            Authenticate →

                        </button>

                    </form>

                    {

                        error &&

                        <p className="font-['IBM_Plex_Mono'] text-sm text-[#E5484D] mt-5 border-t border-[#232B36] pt-4">

                            {error}

                        </p>

                    }

                </div>

                <p className="font-['IBM_Plex_Mono'] text-xs text-[#8A94A3] text-center mt-6">
                    SAML 2.0 · Binding: HTTP-POST · RSA-SHA256
                </p>

            </div>

        </div>

    );

}

export default Login;