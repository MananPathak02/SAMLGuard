import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#0B0F14]">
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    );
}

export default Layout;