import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDirectory() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const employees = [
        {
            name: "Rahul Sharma",
            role: "HR",
            department: "Human Resources",
            email: "rahul@samlguard.com",
        },
        {
            name: "Priya Verma",
            role: "Employee",
            department: "Engineering",
            email: "priya@samlguard.com",
        },
        {
            name: "Arjun Singh",
            role: "Employee",
            department: "Cyber Security",
            email: "arjun@samlguard.com",
        },
        {
            name: "Amit Kapoor",
            role: "Admin",
            department: "IT Administration",
            email: "amit@samlguard.com",
        },
        {
            name: "Sneha Joshi",
            role: "Employee",
            department: "Finance",
            email: "sneha@samlguard.com",
        },
        {
            name: "Vivek Kumar",
            role: "Employee",
            department: "Operations",
            email: "vivek@samlguard.com",
        },
    ];

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase()) ||
        employee.role.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="max-w-7xl mx-auto p-12">

            <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#4FD1C5] mb-3">
                Trusted Enterprise Application
            </p>

            <h1 className="font-['IBM_Plex_Mono'] text-4xl font-bold text-[#E6EAF0]">
                Employee Directory
            </h1>

            <p className="mt-4 font-['IBM_Plex_Sans'] text-[#8A94A3] max-w-3xl leading-relaxed">
                Enterprise employee directory protected by the
                <span className="text-[#E6EAF0]"> SAMLGuard Identity Provider</span>.
                Any authenticated employee can securely search corporate users
                without authenticating again.
            </p>

            {/* Statistics */}

            <div className="grid md:grid-cols-4 gap-6 mt-10">

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <h2 className="text-3xl font-bold font-['IBM_Plex_Mono'] text-[#4FD1C5]">
                        124
                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Employees
                    </p>

                </div>

                <div className="bg-[#131922] border border-[#232B36] rounded-md p-6">

                    <h2 className="text-3xl font-bold font-['IBM_Plex_Mono'] text-[#4FD1C5]">
                        8
                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Departments
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

                        Online

                    </h2>

                    <p className="mt-2 text-sm text-[#8A94A3]">
                        Directory Service
                    </p>

                </div>

            </div>

            {/* Search */}

            <div className="mt-10">

                <input
                    type="text"
                    placeholder="Search by employee, role or department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                        w-full
                        bg-[#131922]
                        border
                        border-[#232B36]
                        rounded-md
                        px-5
                        py-3
                        text-[#E6EAF0]
                        placeholder:text-[#8A94A3]
                        focus:outline-none
                        focus:border-[#4FD1C5]
                    "
                />

            </div>

            {/* Employee Table */}

            <div className="mt-8 bg-[#131922] border border-[#232B36] rounded-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-[#0B0F14]">

                        <tr className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#8A94A3]">

                            <th className="text-left px-6 py-4">Name</th>
                            <th className="text-left px-6 py-4">Role</th>
                            <th className="text-left px-6 py-4">Department</th>
                            <th className="text-left px-6 py-4">Email</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredEmployees.map((employee, index) => (

                            <tr
                                key={index}
                                className="border-t border-[#232B36] hover:bg-[#1A212C]"
                            >

                                <td className="px-6 py-4 text-[#E6EAF0]">
                                    {employee.name}
                                </td>

                                <td className="px-6 py-4 text-[#4FD1C5]">
                                    {employee.role}
                                </td>

                                <td className="px-6 py-4 text-[#E6EAF0]">
                                    {employee.department}
                                </td>

                                <td className="px-6 py-4 text-[#8A94A3]">
                                    {employee.email}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Authentication Details */}

            <div className="bg-[#131922] border border-[#232B36] rounded-md mt-10 p-8">

                <h2 className="font-['IBM_Plex_Mono'] text-xl text-[#E6EAF0] mb-5">
                    Authentication Details
                </h2>

                <div className="space-y-4 text-sm font-['IBM_Plex_Sans']">

                    <div className="flex justify-between border-b border-[#232B36] pb-3">
                        <span className="text-[#8A94A3]">Authentication</span>
                        <span className="text-[#E6EAF0]">SAML 2.0 Single Sign-On</span>
                    </div>

                    <div className="flex justify-between border-b border-[#232B36] pb-3">
                        <span className="text-[#8A94A3]">Identity Provider</span>
                        <span className="text-[#E6EAF0]">SAMLGuard</span>
                    </div>

                    <div className="flex justify-between border-b border-[#232B36] pb-3">
                        <span className="text-[#8A94A3]">Authorization</span>
                        <span className="text-[#E6EAF0]">Authenticated Users</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-[#8A94A3]">Additional Login</span>
                        <span className="text-[#4FD1C5]">Not Required</span>
                    </div>

                </div>

            </div>

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

export default EmployeeDirectory;