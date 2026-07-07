import { useNavigate } from "react-router-dom";

function HRPortal() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-2xl w-[900px] p-12">

                <div className="text-center">

                    <h1 className="text-5xl font-bold text-slate-800">

                        HR Portal

                    </h1>

                    <p className="mt-5 text-xl text-gray-600">

                        Enterprise Human Resource Management System

                    </p>

                </div>

                <div className="mt-12 grid grid-cols-2 gap-10">

                    <div>

                        <h2 className="text-3xl font-bold mb-5">

                            Features

                        </h2>

                        <ul className="space-y-4 text-lg">

                            <li>✔ Employee Records</li>

                            <li>✔ Payroll Management</li>

                            <li>✔ Leave Management</li>

                            <li>✔ Attendance Tracking</li>

                            <li>✔ Recruitment Dashboard</li>

                            <li>✔ SAML 2.0 Single Sign-On</li>

                        </ul>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-8">

                        <h2 className="text-3xl font-bold mb-8">

                            Authentication

                        </h2>

                        <p className="text-gray-600 mb-8">

                            This portal is protected by the
                            SAMLGuard Identity Provider.

                        </p>

                        <button

                            onClick={() => navigate("/login")}

                            className="
                            w-full
                            bg-blue-600
                            text-white
                            py-4
                            rounded-xl
                            text-xl
                            hover:bg-blue-700
                            "

                        >

                            Login with SAML

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HRPortal;