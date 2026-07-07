import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function HRDashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        }

        catch {

            navigate("/login");

        }

    }

    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    if (!user) {

        return (

            <div className="text-center mt-20 text-3xl">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto p-12">

            <h1 className="text-5xl font-bold">

                HR Dashboard

            </h1>

            <p className="text-gray-500 mt-3">

                Authenticated using SAMLGuard Identity Provider

            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-6">

                        User Information

                    </h2>

                    <p><b>Name:</b> {user.first_name} {user.last_name}</p>

                    <p className="mt-3">

                        <b>Email:</b> {user.email}

                    </p>

                    <p className="mt-3">

                        <b>Department:</b> {user.department}

                    </p>

                    <p className="mt-3">

                        <b>Role:</b> {user.role?.name}

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-6">

                        Security Actions

                    </h2>

                    <button

                        onClick={() => navigate("/assertion")}

                        className="w-full bg-blue-600 text-white rounded-lg p-4 mb-4"

                    >

                        View SAML Assertion

                    </button>

                    <button

                        onClick={() => navigate("/attacks")}

                        className="w-full bg-red-600 text-white rounded-lg p-4 mb-4"

                    >

                        Open Attack Lab

                    </button>

                    <button

                        onClick={logout}

                        className="w-full bg-gray-700 text-white rounded-lg p-4"

                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}

export default HRDashboard;