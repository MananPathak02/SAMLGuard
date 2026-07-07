import { useState } from "react";
import api from "../services/api";

function AttackLab() {

    const [replayResult, setReplayResult] = useState("");

    const [xswResult, setXswResult] = useState("");

    const [attributeResult, setAttributeResult] = useState("");

    const assertion = localStorage.getItem("assertion");

    async function replayAttack() {

        try {

            const response = await api.post(
            "/saml/replay",
            assertion,
            {
                headers: {
                    "Content-Type": "application/xml"
                }
            }
        );

            setReplayResult(response.data.message);

        }

        catch (error) {

            setReplayResult(
                error.response?.data?.detail ||
                "Replay Attack Blocked"
            );

        }

    }

    async function xswAttack() {

        try {

            const response = await api.post(
            "/saml/xsw",
            assertion,
            {
                headers: {
                    "Content-Type": "application/xml"
                }
            }
        );

            setXswResult(response.data.message);

        }

        catch (error) {

            setXswResult(
                error.response?.data?.detail ||
                "XML Signature Wrapping Detected"
            );

        }

    }

    async function attributeInjection() {

        try {

            const modifiedAssertion = assertion.replace(
            "Employee",
            "Admin"
        );

        const response = await api.post(
            "/saml/attribute-injection",
            modifiedAssertion,
            {
                headers: {
                    "Content-Type": "application/xml"
                }
            }
        );

            setAttributeResult(response.data.message);

        }

        catch (error) {

            setAttributeResult(
                error.response?.data?.detail ||
                "Attribute Injection Detected"
            );

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold">

                    SAML Attack Lab

                </h1>

                <p className="text-gray-500 mt-3">

                    Simulate common SAML attacks and verify detection.

                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">

                    {/* Replay */}

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold">

                            Replay Attack

                        </h2>

                        <p className="mt-4 text-gray-600">

                            Attempts to reuse a previously issued SAML Assertion.

                        </p>

                        <button

                            onClick={replayAttack}

                            className="mt-8 w-full bg-red-600 text-white p-3 rounded-lg"

                        >

                            Simulate

                        </button>

                        <div className="mt-6">

                            <b>Status</b>

                            <p className="mt-2">

                                {replayResult}

                            </p>

                        </div>

                    </div>

                    {/* XSW */}

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold">

                            XML Signature Wrapping

                        </h2>

                        <p className="mt-4 text-gray-600">

                            Attempts to modify the signed XML document.

                        </p>

                        <button

                            onClick={xswAttack}

                            className="mt-8 w-full bg-orange-500 text-white p-3 rounded-lg"

                        >

                            Simulate

                        </button>

                        <div className="mt-6">

                            <b>Status</b>

                            <p className="mt-2">

                                {xswResult}

                            </p>

                        </div>

                    </div>

                    {/* Attribute */}

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold">

                            Attribute Injection

                        </h2>

                        <p className="mt-4 text-gray-600">

                            Attempts to change Role or Department inside the assertion.

                        </p>

                        <button

                            onClick={attributeInjection}

                            className="mt-8 w-full bg-blue-600 text-white p-3 rounded-lg"

                        >

                            Simulate

                        </button>

                        <div className="mt-6">

                            <b>Status</b>

                            <p className="mt-2">

                                {attributeResult}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AttackLab;