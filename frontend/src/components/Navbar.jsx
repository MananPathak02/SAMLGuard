import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-slate-900 text-white shadow-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

                <div>

                    <Link
                        to="/"
                        className="text-3xl font-bold text-blue-400"
                    >
                        SAMLGuard
                    </Link>

                </div>

                <div className="space-x-8 text-lg">

                    <Link to="/">Home</Link>

                    <Link to="/login">Login</Link>

                    <Link to="/hr">HR Portal</Link>

                    <Link to="/employee">Employee</Link>

                    <Link to="/admin">Admin</Link>

                    <Link to="/attacks">Attack Lab</Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;