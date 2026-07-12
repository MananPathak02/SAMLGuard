import { useNavigate } from "react-router-dom";

function CompanyWiki() {

    const navigate = useNavigate();

    const articles = [
        "Employee Handbook",
        "Information Security Policy",
        "Password & MFA Guidelines",
        "Incident Response Playbook",
        "Remote Work Policy",
        "Acceptable Use Policy",
    ];

    return (

        <div className="max-w-7xl mx-auto p-12">

            <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#4FD1C5] mb-3">
                Trusted Enterprise Application
            </p>

            <h1 className="font-['IBM_Plex_Mono'] text-4xl font-bold text-[#E6EAF0]">
                Company Wiki
            </h1>

            <p className="mt-4 text-[#8A94A3] font-['IBM_Plex_Sans'] max-w-3xl leading-relaxed">
                Central knowledge repository accessible through the
                <span className="text-[#E6EAF0]"> SAMLGuard Identity Provider</span>.
                Users authenticated once can securely access corporate documentation
                without signing in again.
            </p>

            {/* Statistics */}

            <div className="grid md:grid-cols-4 gap-6 mt-10">

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <h2 className="text-3xl font-bold font-['IBM_Plex_Mono'] text-[#4FD1C5]">
                        248
                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Documentation Pages
                    </p>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <h2 className="text-3xl font-bold font-['IBM_Plex_Mono'] text-[#4FD1C5]">
                        37
                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Security Policies
                    </p>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <h2 className="text-3xl font-bold font-['IBM_Plex_Mono'] text-[#4FD1C5]">
                        SSO
                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Authentication
                    </p>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <h2 className="text-3xl font-bold font-['IBM_Plex_Mono'] flex items-center gap-2 text-[#E6EAF0]">

                        <span className="w-2 h-2 rounded-full bg-[#4FD1C5]" />

                        Active

                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Service Status
                    </p>

                </div>

            </div>

            {/* Articles */}

            <div className="bg-[#131922] border border-[#232B36] rounded-md mt-10 p-8">

                <h2 className="font-['IBM_Plex_Mono'] text-xl text-[#E6EAF0] mb-6">
                    Knowledge Base
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                    {articles.map((article) => (

                        <div
                            key={article}
                            className="border border-[#232B36] rounded-md p-5 hover:border-[#4FD1C5]/40 transition-colors"
                        >

                            <h3 className="font-['IBM_Plex_Mono'] text-[#E6EAF0]">
                                {article}
                            </h3>

                            <p className="mt-2 text-sm text-[#8A94A3]">
                                Enterprise documentation secured through
                                centralized Single Sign-On.
                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Security */}

            <div className="bg-[#131922] border border-[#232B36] rounded-md mt-10 p-8">

                <h2 className="font-['IBM_Plex_Mono'] text-xl text-[#E6EAF0] mb-5">
                    Authentication Details
                </h2>

                <div className="space-y-4 text-sm font-['IBM_Plex_Sans']">

                    <div className="flex justify-between border-b border-[#232B36] pb-3">

                        <span className="text-[#8A94A3]">
                            Authentication Method
                        </span>

                        <span className="text-[#E6EAF0]">
                            SAML 2.0 Single Sign-On
                        </span>

                    </div>

                    <div className="flex justify-between border-b border-[#232B36] pb-3">

                        <span className="text-[#8A94A3]">
                            Identity Provider
                        </span>

                        <span className="text-[#E6EAF0]">
                            SAMLGuard
                        </span>

                    </div>

                    <div className="flex justify-between border-b border-[#232B36] pb-3">

                        <span className="text-[#8A94A3]">
                            Authorization
                        </span>

                        <span className="text-[#E6EAF0]">
                            Authenticated Users
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-[#8A94A3]">
                            Additional Login
                        </span>

                        <span className="text-[#4FD1C5]">
                            Not Required
                        </span>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-10">

                <button
                    onClick={() => navigate(-1)}
                    className="border border-[#232B36] px-6 py-3 rounded-md text-[#E6EAF0] hover:bg-[#232B36] transition-colors font-['IBM_Plex_Mono']"
                >
                    ← Back
                </button>

            </div>

        </div>

    );

}

export default CompanyWiki;