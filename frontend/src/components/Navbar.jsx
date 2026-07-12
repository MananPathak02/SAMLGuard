import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("assertion");

        navigate("/");

    }

    function isActive(path) {

        return location.pathname === path;

    }

    // -------------------------
    // Links Before Login
    // -------------------------

    let links = [

        {
            to: "/",
            label: "Home"
        },

        {
            to: "/login",
            label: "Login"
        },

        {
            to: "/#service-providers",
            label: "Service Providers"
        }

    ];

    // -------------------------
    // Links After Login
    // -------------------------

    if (token) {

        if (role === "Admin") {

            links = [

                {
                    to: "/",
                    label: "Home"
                },

                {
                    to: "/admin/dashboard",
                    label: "Dashboard"
                },

                {
                    to: "/",
                    label: "Service Providers"
                },

                {
                    to: "/assertion",
                    label: "Assertion"
                },

                {
                    to: "/audit",
                    label: "Audit Logs"
                }

            ];

        }

        else if (role === "HR") {

            links = [

                {
                    to: "/",
                    label: "Home"
                },

                {
                    to: "/hr/dashboard",
                    label: "Dashboard"
                },

                {
                    to: "/",
                    label: "Service Providers"
                },

                {
                    to: "/assertion",
                    label: "Assertion"
                }

            ];

        }

        else if (role === "Employee") {

            links = [

                {
                    to: "/",
                    label: "Home"
                },

                {
                    to: "/employee/dashboard",
                    label: "Dashboard"
                },

                {
                    to: "/",
                    label: "Service Providers"
                },

                {
                    to: "/assertion",
                    label: "Assertion"
                }

            ];

        }

    }

    return (

        <nav className="bg-[#0B0F14] border-b border-[#232B36]">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

                <Link
                    to="/"
                    className="font-['IBM_Plex_Mono'] text-lg font-bold text-[#E6EAF0]"
                >
                    SAML<span className="text-[#4FD1C5]">Guard</span>
                </Link>

                <div className="flex items-center gap-1 font-['IBM_Plex_Mono'] text-sm">

                    {links.map((link) => (

                        <Link
                            key={link.label}
                            to={link.to}
                            className={`
                                px-4 py-2 rounded-md transition-colors
                                ${isActive(link.to)
                                    ? "text-[#4FD1C5] bg-[#4FD1C5]/10"
                                    : "text-[#8A94A3] hover:text-[#E6EAF0]"
                                }
                            `}
                        >

                            {link.label}

                        </Link>

                    ))}

                    {
                        token && role === "Admin" &&

                        <Link
                            to="/attacks"
                            className={`
                                px-4 py-2 rounded-md transition-colors ml-2 border
                                ${isActive("/attacks")
                                    ? "text-[#E5484D] bg-[#E5484D]/10 border-[#E5484D]/40"
                                    : "text-[#E5484D]/70 border-[#E5484D]/20 hover:text-[#E5484D] hover:border-[#E5484D]/40"
                                }
                            `}
                        >

                            Attack Lab

                        </Link>

                    }

                    {

                        token &&

                        <button
                            onClick={logout}
                            className="
                                ml-2
                                px-4
                                py-2
                                rounded-md
                                bg-[#232B36]
                                text-[#E6EAF0]
                                hover:bg-[#2A3341]
                                transition-colors
                            "
                        >

                            Logout

                        </button>

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;