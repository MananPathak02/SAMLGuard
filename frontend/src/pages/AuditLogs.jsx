import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AuditLogs() {

    const navigate = useNavigate();

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        loadLogs();

    }, []);

    async function loadLogs() {

        try {

            const response = await api.get("/audit/logs");

            setLogs(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-5xl font-bold">

                            Security Audit Logs

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Monitor authentication events and SAML security attacks.

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/admin/dashboard")}

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                    >

                        Back to Dashboard

                    </button>

                </div>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    #

                                </th>

                                <th className="p-4 text-left">

                                    Event

                                </th>

                                <th className="p-4 text-left">

                                    Status

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                logs.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="text-center p-10"
                                        >

                                            No audit logs found.

                                        </td>

                                    </tr>

                                )

                                :

                                logs.map((log, index) => (

                                    <tr
                                        key={index}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="p-4">

                                            {index + 1}

                                        </td>

                                        <td className="p-4">

                                            {log.event}

                                        </td>

                                        <td className="p-4">

                                            {

                                                log.status === "Blocked"

                                                ?

                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">

                                                    {log.status}

                                                </span>

                                                :

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                                                    {log.status}

                                                </span>

                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default AuditLogs;