import { Link } from "react-router-dom";

function Forbidden() {

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100">

            <h1 className="text-7xl font-bold text-red-600">

                403

            </h1>

            <h2 className="text-3xl font-semibold mt-4">

                Access Denied

            </h2>

            <p className="text-gray-600 mt-4">

                You do not have permission to access this page.

            </p>

            <Link

                to="/"

                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"

            >

                Return Home

            </Link>

        </div>

    );

}

export default Forbidden;