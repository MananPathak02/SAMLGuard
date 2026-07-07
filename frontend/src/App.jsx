import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import AuditLogs from "./pages/AuditLogs";

import Forbidden from "./pages/Forbidden";

import HRPortal from "./pages/HRPortal";
import HRDashboard from "./pages/HRDashboard";

import EmployeePortal from "./pages/EmployeePortal";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import AdminPortal from "./pages/AdminPortal";
import AdminDashboard from "./pages/AdminDashboard";

import AttackLab from "./pages/AttackLab";
import AssertionViewer from "./pages/AssertionViewer";

import NotFound from "./pages/NotFound";

function App() {
    return (
        <Layout>

            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Public Portal Pages */}

                <Route
                    path="/hr"
                    element={<HRPortal />}
                />

                <Route
                    path="/employee"
                    element={<EmployeePortal />}
                />

                <Route
                    path="/admin"
                    element={<AdminPortal />}
                />

                {/* Protected Dashboards */}

                <Route
                    path="/hr/dashboard"
                    element={
                        <ProtectedRoute>
                            <HRDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/audit"
                    element={
                        <ProtectedRoute>
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employee/dashboard"
                    element={
                        <ProtectedRoute>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attacks"
                    element={
                        <ProtectedRoute>
                            <AttackLab />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assertion"
                    element={
                        <ProtectedRoute>
                            <AssertionViewer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/home"
                    element={<Navigate to="/" />}
                />

                <Route
                    path="/403"
                    element={<Forbidden />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </Layout>
    );
}

export default App;