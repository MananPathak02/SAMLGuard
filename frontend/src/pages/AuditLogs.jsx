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

        <div className="max-w-7xl mx-auto p-12">

            <div className="flex justify-between items-center mb-10">

                <div>

                    <p className="font-['IBM_Plex_Mono'] text-xs tracking-widest text-[#4FD1C5] uppercase mb-3">
                        Admin Console
                    </p>

                    <h1 className="font-['IBM_Plex_Mono'] text-3xl font-bold text-[#E6EAF0]">

                        Security Audit Logs

                    </h1>

                    <p className="font-['IBM_Plex_Sans'] text-sm text-[#8A94A3] mt-2">

                        Monitor authentication events and SAML security attacks.

                    </p>

                </div>

                <button

                    onClick={() => navigate("/admin/dashboard")}

                    className="font-['IBM_Plex_Mono'] text-sm border border-[#232B36] text-[#E6EAF0] px-5 py-3 rounded-md hover:bg-[#232B36] transition-colors"

                >

                    Back to Dashboard

                </button>

            </div>

            <div className="bg-[#131922] border border-[#232B36] rounded-md overflow-hidden">

                <table className="w-full font-['IBM_Plex_Sans'] text-sm">

                    <thead>

                        <tr className="border-b border-[#232B36]">

                            <th className="p-4 text-left font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#8A94A3] font-medium">

                                #

                            </th>

                            <th className="p-4 text-left font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#8A94A3] font-medium">

                                Event

                            </th>

                            <th className="p-4 text-left font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#8A94A3] font-medium">

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
                                        className="text-center p-10 text-[#8A94A3] font-['IBM_Plex_Mono'] text-sm"
                                    >

                                        No audit logs found.

                                    </td>

                                </tr>

                            )

                            :

                            logs.map((log, index) => (

                                <tr
                                    key={index}
                                    className="border-b border-[#232B36] hover:bg-[#0B0F14] transition-colors"
                                >

                                    <td className="p-4 text-[#8A94A3] font-['IBM_Plex_Mono'] text-xs">

                                        {index + 1}

                                    </td>

                                    <td className="p-4 text-[#E6EAF0]">

                                        {log.event}

                                    </td>

                                    <td className="p-4">

                                        {

                                            log.status === "Blocked"

                                            ?

                                            <span className="font-['IBM_Plex_Mono'] text-xs text-[#E5484D] border border-[#E5484D]/40 px-3 py-1 rounded-full">

                                                {log.status}

                                            </span>

                                            :

                                            <span className="font-['IBM_Plex_Mono'] text-xs text-[#4FD1C5] border border-[#4FD1C5]/40 px-3 py-1 rounded-full">

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

    );

}

export default AuditLogs;