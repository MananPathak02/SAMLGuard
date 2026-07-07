import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-5xl font-bold">

                    Employee Dashboard

                </h1>

                <p className="text-gray-500 mt-3">

                    Authenticated through SAMLGuard

                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Employee Services

                        </h2>

                        <ul className="space-y-4">

                            <li>📄 View Profile</li>

                            <li>🏖 Apply Leave</li>

                            <li>💰 Payroll</li>

                            <li>📅 Attendance</li>

                            <li>📚 Training</li>

                        </ul>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Security

                        </h2>

                        <button
                            onClick={() => navigate("/assertion")}
                            className="w-full bg-blue-600 text-white rounded-lg p-4 mb-4"
                        >
                            View SAML Assertion
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

export default EmployeeDashboard;