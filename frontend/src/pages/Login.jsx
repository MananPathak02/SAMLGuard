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

        <div className="flex justify-center items-center h-[85vh]">

            <div className="bg-white p-10 rounded-xl shadow-xl w-[450px]">

                <h1 className="text-3xl font-bold mb-8 text-center">

                    SAML Identity Provider

                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <input

                        type="email"

                        placeholder="Email"

                        className="w-full border rounded-lg p-3"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        className="w-full border rounded-lg p-3"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                    />

                    <button

                        className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"

                    >

                        Login

                    </button>

                </form>

                {

                    error &&

                    <p className="text-red-600 mt-5">

                        {error}

                    </p>

                }

            </div>

        </div>

    );

}

export default Login;