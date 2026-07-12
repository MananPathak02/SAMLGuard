import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="max-w-7xl mx-auto p-8 lg:p-12">

            {/* Header */}

            <p className="font-['IBM_Plex_Mono'] text-xs tracking-[0.25em] uppercase text-[#4FD1C5] mb-3">
                Admin Console
            </p>

            <h1 className="font-['IBM_Plex_Mono'] text-4xl font-bold text-[#E6EAF0]">
                Security Administration Console
            </h1>

            <p className="font-['IBM_Plex_Sans'] text-[#8A94A3] mt-4 max-w-3xl leading-7">
                Manage enterprise authentication, monitor SAML assertions,
                review security events, and administer the Identity Provider
                from a centralized IBM Plex styled dashboard.
            </p>

            {/* Authentication Status */}

            <div className="mt-10">

                <h2 className="font-['IBM_Plex_Mono'] text-sm uppercase tracking-[0.2em] text-[#8A94A3] mb-5">
                    Authentication Status
                </h2>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <div className="bg-[#131922] border border-[#232B36] rounded-lg p-6 hover:border-[#4FD1C5]/50 transition-all">

                        <div className="flex items-center justify-between">

                            <span className="text-4xl">🛡️</span>

                            <span className="w-3 h-3 rounded-full bg-[#4FD1C5]" />

                        </div>

                        <h3 className="mt-5 font-['IBM_Plex_Mono'] text-3xl font-bold text-[#4FD1C5]">
                            1
                        </h3>

                        <p className="mt-3 font-['IBM_Plex_Sans'] text-[#8A94A3]">
                            Identity Provider
                        </p>

                    </div>

                    <div className="bg-[#131922] border border-[#232B36] rounded-lg p-6 hover:border-[#4FD1C5]/50 transition-all">

                        <div className="flex items-center justify-between">

                            <span className="text-4xl">🌐</span>

                            <span className="w-3 h-3 rounded-full bg-[#4FD1C5]" />

                        </div>

                        <h3 className="mt-5 font-['IBM_Plex_Mono'] text-3xl font-bold text-[#4FD1C5]">
                            3
                        </h3>

                        <p className="mt-3 font-['IBM_Plex_Sans'] text-[#8A94A3]">
                            Service Providers
                        </p>

                    </div>

                    <div className="bg-[#131922] border border-[#232B36] rounded-lg p-6 hover:border-[#E5484D]/50 transition-all">

                        <div className="flex items-center justify-between">

                            <span className="text-4xl">🔒</span>

                            <span className="w-3 h-3 rounded-full bg-[#E5484D]" />

                        </div>

                        <h3 className="mt-5 font-['IBM_Plex_Mono'] text-3xl font-bold text-[#E5484D]">
                            3
                        </h3>

                        <p className="mt-3 font-['IBM_Plex_Sans'] text-[#8A94A3]">
                            Security Modules
                        </p>

                    </div>

                    <div className="bg-[#131922] border border-[#232B36] rounded-lg p-6 hover:border-[#4FD1C5]/50 transition-all">

                        <div className="flex items-center justify-between">

                            <span className="text-4xl">✅</span>

                            <span className="w-3 h-3 rounded-full bg-[#4FD1C5]" />

                        </div>

                        <h3 className="mt-5 font-['IBM_Plex_Mono'] text-2xl font-bold text-[#E6EAF0]">
                            Active
                        </h3>

                        <p className="mt-3 font-['IBM_Plex_Sans'] text-[#8A94A3]">
                            Authentication System
                        </p>

                    </div>

                </div>

            </div>

            {/* Main Grid */}

            <div className="grid xl:grid-cols-3 gap-8 mt-10">

                {/* User Information */}

                <div className="bg-[#131922] border border-[#232B36] rounded-lg p-7">

                    <h2 className="font-['IBM_Plex_Mono'] text-sm uppercase tracking-[0.2em] text-[#8A94A3] mb-6">
                        User Information
                    </h2>

                    <div className="space-y-5 font-['IBM_Plex_Sans']">

                        <div>

                            <p className="text-xs uppercase tracking-wider text-[#6E7684]">
                                Role
                            </p>

                            <p className="text-[#E6EAF0] mt-1">
                                Security Administrator
                            </p>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-wider text-[#6E7684]">
                                Access Level
                            </p>

                            <p className="text-[#4FD1C5] mt-1">
                                Full Administrative Access
                            </p>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-wider text-[#6E7684]">
                                Identity Provider
                            </p>

                            <p className="text-[#E6EAF0] mt-1">
                                SAMLGuard IdP
                            </p>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-wider text-[#6E7684]">
                                Session Status
                            </p>

                            <p className="text-[#4FD1C5] mt-1">
                                Authenticated
                            </p>

                        </div>

                    </div>

                </div>

                {/* Enterprise Services */}

                <div className="bg-[#131922] border border-[#232B36] rounded-lg p-7">

                    <h2 className="font-['IBM_Plex_Mono'] text-sm uppercase tracking-[0.2em] text-[#8A94A3] mb-6">
                        Enterprise Services
                    </h2>

                    <div className="space-y-4">

                        <button
                            onClick={() => navigate("/wiki")}
                            className="w-full text-left border border-[#232B36] rounded-lg p-4 hover:border-[#4FD1C5] hover:bg-[#1A212C] transition"
                        >
                            <h3 className="font-['IBM_Plex_Mono'] text-[#E6EAF0]">
                                📚 Company Wiki
                            </h3>

                            <p className="font-['IBM_Plex_Sans'] text-sm text-[#8A94A3] mt-2">
                                Secure enterprise documentation portal.
                            </p>
                        </button>

                        <button
                            onClick={() => navigate("/directory")}
                            className="w-full text-left border border-[#232B36] rounded-lg p-4 hover:border-[#4FD1C5] hover:bg-[#1A212C] transition"
                        >
                            <h3 className="font-['IBM_Plex_Mono'] text-[#E6EAF0]">
                                👥 Employee Directory
                            </h3>

                            <p className="font-['IBM_Plex_Sans'] text-sm text-[#8A94A3] mt-2">
                                Browse authenticated employee profiles.
                            </p>
                        </button>

                    </div>

                </div>

                {/* Identity & Security */}

                <div className="bg-[#131922] border border-[#232B36] rounded-lg p-7">

                    <h2 className="font-['IBM_Plex_Mono'] text-sm uppercase tracking-[0.2em] text-[#8A94A3] mb-6">
                        Identity & Security
                    </h2>

                    <div className="space-y-4 font-['IBM_Plex_Mono'] text-sm">

                        <button
                            onClick={() => navigate("/assertion")}
                            className="w-full border border-[#4FD1C5]/40 text-[#4FD1C5] rounded-lg p-3.5 hover:bg-[#4FD1C5]/10 transition"
                        >
                            View Assertion
                        </button>

                        <button
                            onClick={() => navigate("/attacks")}
                            className="w-full border border-[#E5484D]/40 text-[#E5484D] rounded-lg p-3.5 hover:bg-[#E5484D]/10 transition"
                        >
                            Attack Lab
                        </button>

                        <button
                            onClick={() => navigate("/audit")}
                            className="w-full border border-[#232B36] text-[#E6EAF0] rounded-lg p-3.5 hover:bg-[#232B36] transition"
                        >
                            Audit Logs
                        </button>

                        <button
                            onClick={logout}
                            className="w-full bg-[#232B36] text-[#E6EAF0] rounded-lg p-3.5 hover:bg-[#2D3748] transition"
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