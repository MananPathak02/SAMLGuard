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
        localStorage.removeItem("role");
        localStorage.removeItem("assertion");

        navigate("/");

    }

    if (!user) {

        return (

            <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center">

                <p className="font-['IBM_Plex_Mono'] text-[#4FD1C5] text-xl">

                    Loading Dashboard...

                </p>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-12">

            {/* Header */}

            <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#4FD1C5] mb-3">

                Employee Dashboard

            </p>

            <h1 className="font-['IBM_Plex_Mono'] text-4xl font-bold text-[#E6EAF0]">

                Welcome, {user.first_name} {user.last_name}

            </h1>

            <p className="mt-4 text-[#8A94A3] font-['IBM_Plex_Sans'] max-w-3xl leading-relaxed">

                Authenticated through the
                <span className="text-[#E6EAF0]"> SAMLGuard Identity Provider</span>.
                Trusted enterprise services below reuse your existing authenticated
                SAML session and therefore do not require additional authentication.

            </p>

            {/* Authentication Status */}

            <div className="grid md:grid-cols-4 gap-6 mt-10">

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <p className="text-sm text-[#8A94A3]">

                        Identity Provider

                    </p>

                    <h2 className="mt-3 text-[#4FD1C5] font-['IBM_Plex_Mono'] text-xl">

                        Authenticated

                    </h2>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <p className="text-sm text-[#8A94A3]">

                        SAML Assertion

                    </p>

                    <h2 className="mt-3 text-[#4FD1C5] font-['IBM_Plex_Mono'] text-xl">

                        Generated

                    </h2>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <p className="text-sm text-[#8A94A3]">

                        Session

                    </p>

                    <h2 className="mt-3 text-[#4FD1C5] font-['IBM_Plex_Mono'] text-xl">

                        Active

                    </h2>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <p className="text-sm text-[#8A94A3]">

                        Role

                    </p>

                    <h2 className="mt-3 text-[#4FD1C5] font-['IBM_Plex_Mono'] text-xl">

                        {user.role?.name}

                    </h2>

                </div>

            </div>

            {/* User Information */}

            <div className="bg-[#131922] border border-[#232B36] rounded-md mt-10 p-8">

                <h2 className="font-['IBM_Plex_Mono'] text-2xl text-[#E6EAF0] mb-6">

                    User Information

                </h2>

                <div className="grid md:grid-cols-2 gap-8 text-sm">

                    <div>

                        <p className="text-[#8A94A3]">Name</p>

                        <p className="text-[#E6EAF0] mt-1">

                            {user.first_name} {user.last_name}

                        </p>

                    </div>

                    <div>

                        <p className="text-[#8A94A3]">Email</p>

                        <p className="text-[#E6EAF0] mt-1">

                            {user.email}

                        </p>

                    </div>

                    <div>

                        <p className="text-[#8A94A3]">Department</p>

                        <p className="text-[#E6EAF0] mt-1">

                            {user.department}

                        </p>

                    </div>

                    <div>

                        <p className="text-[#8A94A3]">Authorization Role</p>

                        <p className="text-[#E6EAF0] mt-1">

                            {user.role?.name}

                        </p>

                    </div>

                </div>

            </div>

            {/* Enterprise Services */}

            <div className="mt-10">

                <h2 className="font-['IBM_Plex_Mono'] text-2xl text-[#E6EAF0] mb-6">

                    Enterprise Services

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-[#131922] border border-[#232B36] rounded-md p-8">

                        <h3 className="font-['IBM_Plex_Mono'] text-xl text-[#E6EAF0]">

                            📘 Company Wiki

                        </h3>

                        <p className="mt-4 text-[#8A94A3] leading-relaxed">

                            Access enterprise documentation, security policies,
                            employee handbook, operational procedures, and
                            corporate knowledge secured through SAML Single Sign-On.

                        </p>

                        <button

                            onClick={() => navigate("/wiki")}

                            className="mt-8 w-full bg-[#4FD1C5] text-[#0B0F14] font-semibold rounded-md py-3 hover:bg-[#4FD1C5]/90 transition-colors"

                        >

                            Launch Service →

                        </button>

                    </div>

                    <div className="bg-[#131922] border border-[#232B36] rounded-md p-8">

                        <h3 className="font-['IBM_Plex_Mono'] text-xl text-[#E6EAF0]">

                            👥 Employee Directory

                        </h3>

                        <p className="mt-4 text-[#8A94A3] leading-relaxed">

                            Browse employees, departments, corporate contacts,
                            and organization information without additional
                            authentication.

                        </p>

                        <button

                            onClick={() => navigate("/directory")}

                            className="mt-8 w-full bg-[#4FD1C5] text-[#0B0F14] font-semibold rounded-md py-3 hover:bg-[#4FD1C5]/90 transition-colors"

                        >

                            Launch Service →

                        </button>

                    </div>

                </div>

            </div>

            {/* Identity */}

            <div className="bg-[#131922] border border-[#232B36] rounded-md mt-10 p-8">

                <h2 className="font-['IBM_Plex_Mono'] text-2xl text-[#E6EAF0] mb-6">

                    Identity & Security

                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                    <button

                        onClick={() => navigate("/assertion")}

                        className="border border-[#4FD1C5]/40 text-[#4FD1C5] rounded-md py-4 hover:bg-[#4FD1C5]/10 transition-colors"

                    >

                        View SAML Assertion

                    </button>

                    <button

                        onClick={logout}

                        className="border border-[#E5484D]/40 text-[#E5484D] rounded-md py-4 hover:bg-[#E5484D]/10 transition-colors"

                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}

export default HRDashboard;