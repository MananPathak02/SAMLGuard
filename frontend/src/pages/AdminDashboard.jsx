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

                    Enterprise SAMLGuard Management Dashboard

                </p>

                <div className="grid md:grid-cols-4 gap-8 mt-10">

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-blue-600">

                            1

                        </h2>

                        <p className="mt-3">

                            Identity Provider

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-green-600">

                            3

                        </h2>

                        <p className="mt-3">

                            Service Providers

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-red-600">

                            3

                        </h2>

                        <p className="mt-3">

                            Security Modules

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-purple-600">

                            Active

                        </h2>

                        <p className="mt-3">

                            System Status

                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

                    <h2 className="text-3xl font-bold mb-6">

                        Quick Actions

                    </h2>

                    <div className="grid md:grid-cols-4 gap-5">

                        <button
                            onClick={() => navigate("/assertion")}
                            className="bg-blue-600 text-white rounded-lg p-4"
                        >
                            View Assertion
                        </button>

                        <button
                            onClick={() => navigate("/attacks")}
                            className="bg-red-600 text-white rounded-lg p-4"
                        >
                            Attack Lab
                        </button>

                        <button
                            onClick={() => navigate("/audit")}
                            className="bg-purple-600 text-white rounded-lg p-4"
                        >
                            Audit Logs
                        </button>

                        <button
                            onClick={logout}
                            className="bg-gray-700 text-white rounded-lg p-4"
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