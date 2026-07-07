import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold">

                    Security Administration Console

                </h1>

                <p className="text-gray-500 mt-3">

                    Enterprise Identity Provider Administration

                </p>

                <div className="grid md:grid-cols-4 gap-8 mt-12">

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-blue-600">

                            1

                        </h2>

                        <p className="mt-4">

                            Identity Provider

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-green-600">

                            3

                        </h2>

                        <p className="mt-4">

                            Service Providers

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-red-600">

                            3

                        </h2>

                        <p className="mt-4">

                            Security Attacks

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-purple-600">

                            Active

                        </h2>

                        <p className="mt-4">

                            System Status

                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-10">

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Security Features

                        </h2>

                        <ul className="space-y-4 text-lg">

                            <li>✅ JWT Authentication</li>

                            <li>✅ SAML Assertion Generation</li>

                            <li>✅ Replay Attack Detection</li>

                            <li>✅ XML Signature Wrapping Detection</li>

                            <li>✅ Attribute Injection Detection</li>

                            <li>✅ Role Based Access Control</li>

                        </ul>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Quick Actions

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

        </div>

    );

}

export default AdminDashboard;