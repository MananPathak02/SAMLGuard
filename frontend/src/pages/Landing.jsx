import PortalCard from "../components/PortalCard";

function Landing() {

    return (

        <div
            className="
            max-w-7xl
            mx-auto
            p-12
            "
        >

            <div className="text-center mb-16">

                <h1
                    className="
                    text-6xl
                    font-extrabold
                    text-slate-900
                    "
                >
                    SAMLGuard
                </h1>

                <p
                    className="
                    text-2xl
                    mt-6
                    text-gray-600
                    "
                >
                    Enterprise SAML Identity Provider & Cybersecurity Attack Lab
                </p>

            </div>

            <div
                className="
                grid
                md:grid-cols-3
                gap-10
                "
            >

                <PortalCard

                    title="HR Portal"

                    description="Human Resource Management Portal protected using SAML Single Sign-On."

                    button="Open HR Portal"

                    link="/hr"

                />

                <PortalCard

                    title="Employee Portal"

                    description="Employee self-service dashboard authenticated using SAML."

                    button="Open Employee Portal"

                    link="/employee"

                />

                <PortalCard

                    title="Admin Portal"

                    description="Administrator console for managing users and security."

                    button="Open Admin Portal"

                    link="/admin"

                />

            </div>

            <div
                className="
                mt-20
                bg-white
                rounded-xl
                shadow-lg
                p-10
                "
            >

                <h2
                    className="
                    text-4xl
                    font-bold
                    mb-6
                    "
                >
                    Project Features
                </h2>

                <ul
                    className="
                    text-xl
                    space-y-4
                    list-disc
                    ml-8
                    "
                >

                    <li>Identity Provider (IdP)</li>

                    <li>Role Based Access Control</li>

                    <li>SAML Assertion Generation</li>

                    <li>Replay Attack Detection</li>

                    <li>XML Signature Wrapping Detection</li>

                    <li>Attribute Injection Detection</li>

                    <li>JWT Authentication</li>

                </ul>

            </div>

        </div>

    );

}

export default Landing;