import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HRPortal() {

    const navigate = useNavigate();

    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {

            setCheckingSession(false);
            return;

        }

        if (role === "HR") {

            navigate("/hr/dashboard", { replace: true });

        }

        else {

            navigate("/403", { replace: true });

        }

    }, [navigate]);

    // Show loading while checking existing SSO session

    if (checkingSession) {

        return (

            <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center">

                <div className="text-center">

                    <p className="font-['IBM_Plex_Mono'] text-[#4FD1C5] text-lg">

                        Checking existing SAML session...

                    </p>

                    <p className="mt-3 text-[#8A94A3] font-['IBM_Plex_Sans']">

                        Verifying authentication with Identity Provider

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-6">

            <div className="bg-[#131922] border border-[#232B36] rounded-md w-full max-w-4xl p-12">

                <div>

                    <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest text-[#4FD1C5] uppercase mb-3">

                        Service Provider

                    </p>

                    <h1 className="font-['IBM_Plex_Mono'] text-4xl font-bold text-[#E6EAF0]">

                        HR Portal

                    </h1>

                    <p className="mt-4 font-['IBM_Plex_Sans'] text-[#8A94A3]">

                        Enterprise Human Resource Management System

                    </p>

                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-10">

                    <div>

                        <h2 className="font-['IBM_Plex_Mono'] text-sm tracking-widest uppercase text-[#8A94A3] mb-5">

                            Features

                        </h2>

                        <ul className="space-y-3 font-['IBM_Plex_Sans'] text-sm text-[#E6EAF0]">

                            {[
                                "Employee Records",
                                "Payroll Management",
                                "Leave Management",
                                "Attendance Tracking",
                                "Recruitment Dashboard",
                                "SAML 2.0 Single Sign-On",
                            ].map((item) => (

                                <li key={item} className="flex items-center gap-3">

                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />

                                    {item}

                                </li>

                            ))}

                        </ul>

                    </div>

                    <div className="bg-[#0B0F14] border border-[#232B36] rounded-md p-8">

                        <h2 className="font-['IBM_Plex_Mono'] text-sm tracking-widest uppercase text-[#8A94A3] mb-4">

                            Authentication

                        </h2>

                        <p className="font-['IBM_Plex_Sans'] text-sm text-[#8A94A3] mb-8 leading-relaxed">

                            No active SAML session was found. Authenticate through the
                            SAMLGuard Identity Provider to access this Service Provider.

                        </p>

                        <button

                            onClick={() => navigate("/login")}

                            className="
                            w-full
                            font-['IBM_Plex_Mono']
                            text-sm
                            bg-[#4FD1C5]
                            text-[#0B0F14]
                            font-semibold
                            py-3.5
                            rounded-md
                            hover:bg-[#4FD1C5]/90
                            transition-colors
                            "

                        >

                            Login with SAML →

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HRPortal;