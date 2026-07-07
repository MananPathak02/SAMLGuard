import Navbar from "./Navbar";

function Layout({ children }) {

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div>

                {children}

            </div>

        </div>

    );

}

export default Layout;