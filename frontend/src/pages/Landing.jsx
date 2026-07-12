import PortalCard from "../components/PortalCard";

function Landing() {
    return (
        <div>

            <div className="max-w-7xl mx-auto px-12 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">

                <div>
                    <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest text-[#4FD1C5] uppercase mb-5">
                        SAML 2.0 Identity Provider
                    </p>
                    <h1 className="font-['IBM_Plex_Mono'] text-5xl md:text-6xl font-bold text-[#E6EAF0] leading-[1.1]">
                        SAMLGuard
                    </h1>
                    <p className="font-['IBM_Plex_Sans'] text-lg mt-6 text-[#8A94A3] max-w-lg leading-relaxed">
                        Enterprise <span className="text-[#E6EAF0]">SAML 2.0 Identity Provider</span>
                        providing centralized authentication, secure Single Sign-On (SSO),
                        role-based authorization, and real-time protection against enterprise
                        identity attacks.
                    </p>

                    <div className="flex gap-8 mt-10 font-['IBM_Plex_Mono'] text-xs text-[#8A94A3]">
                        <div>
                            <p className="text-[#4FD1C5] text-lg font-semibold">RSA-SHA256</p>
                            <p className="mt-1">Signing Algorithm</p>
                        </div>
                        <div>
                            <p className="text-[#4FD1C5] text-lg font-semibold">300s</p>
                            <p className="mt-1">Replay Window</p>
                        </div>
                        <div>
                            <p className="text-[#4FD1C5] text-lg font-semibold">HTTP-POST</p>
                            <p className="mt-1">SSO Binding</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#232B36]">
                        <span className="font-['IBM_Plex_Mono'] text-xs text-[#8A94A3]">assertion.xml</span>
                        <span className="flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs text-[#4FD1C5]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />
                            Signed
                        </span>
                    </div>
                    <pre className="font-['IBM_Plex_Mono'] text-xs leading-relaxed p-5 overflow-x-auto text-[#8A94A3]">
<span className="text-[#4FD1C5]">{'<saml2:Assertion'}</span>{' ID="_a3f9c1e0"\n  IssueInstant="2026-07-11T09:42:00Z"'}<span className="text-[#4FD1C5]">{'>'}</span>{'\n  '}<span className="text-[#4FD1C5]">{'<saml2:Issuer>'}</span>{'samlguard-idp'}<span className="text-[#4FD1C5]">{'</saml2:Issuer>'}</span>{'\n  '}<span className="text-[#4FD1C5]">{'<saml2:Subject>'}</span>{'\n    '}<span className="text-[#4FD1C5]">{'<saml2:NameID>'}</span>{'user@company.com'}<span className="text-[#4FD1C5]">{'</saml2:NameID>'}</span>{'\n  '}<span className="text-[#4FD1C5]">{'</saml2:Subject>'}</span>{'\n  '}<span className="text-[#E5484D]">{'<ds:Signature>'}</span>{' … RSA-SHA256 …'}<span className="text-[#E5484D]">{'</ds:Signature>'}</span>{'\n'}<span className="text-[#4FD1C5]">{'</saml2:Assertion>'}</span>
                    </pre>
                </div>

            </div>

            <div id="service-providers"className="max-w-7xl mx-auto px-12 pb-24">

                <p className="font-['IBM_Plex_Sans'] text-sm text-[#8A94A3] mb-8 max-w-3xl">

                    Authenticate once through the SAMLGuard Identity Provider and securely
                    access trusted enterprise applications. Each Service Provider validates
                    the authenticated identity while enforcing Role-Based Access Control (RBAC).

                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <PortalCard
                        index="SP-01"
                        title="HR Portal"
                        description="Trusted Service Provider for Human Resource Management secured through SAML SSO and Role-Based Access Control."
                        button="Open HR Portal"
                        link="/hr"
                    />
                    <PortalCard
                        index="SP-02"
                        title="Employee Portal"
                        description="Trusted Service Provider offering employee self-service through centralized SAML authentication."
                        button="Open Employee Portal"
                        link="/employee"
                    />
                    <PortalCard
                        index="SP-03"
                        title="Admin Portal"
                        description="Privileged Service Provider for Identity, Security, and SAML administration protected by RBAC."
                        button="Open Admin Portal"
                        link="/admin"
                    />
                </div>

                <div className="mt-16 bg-[#131922] border border-[#232B36] rounded-md p-10">
                    <h2 className="font-['IBM_Plex_Mono'] text-2xl font-semibold text-[#E6EAF0] mb-8">
                        Implementation
                    </h2>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 font-['IBM_Plex_Sans'] text-sm">
                        {[
                            "Centralized Identity Provider (IdP)",
                            "SAML 2.0 Single Sign-On (SSO)",
                            "SAML Assertion Generation",
                            "Role-Based Access Control (RBAC)",
                            "JWT Session Management",
                            "Replay Attack Detection",
                            "XML Signature Wrapping Detection",
                            "Attribute Injection Detection",
                            "Security Audit Logging",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 py-2 border-b border-[#232B36]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5]" />
                                <span className="text-[#E6EAF0]">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Landing;