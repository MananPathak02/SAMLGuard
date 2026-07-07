import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const location = useLocation();

    if (!token) {

        return <Navigate to="/login" replace />;

    }

    const path = location.pathname;

    if (path.startsWith("/admin") && role !== "Admin") {

        return <Navigate to="/403" replace />;

    }

    if (path.startsWith("/hr") && role !== "HR") {

        return <Navigate to="/403" replace />;

    }

    if (path.startsWith("/employee") && role !== "Employee") {

        return <Navigate to="/403" replace />;

    }

    return children;

}

export default ProtectedRoute;