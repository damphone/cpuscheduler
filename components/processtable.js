'use client';

import React, { useState, useEffect } from "react";
import { generateProcess } from "../components/randomprocessgen";

export default function ProcessTable() {
    const [numProcesses, setNumProcesses] = useState(5);
    const [processes, setProcesses] = useState([]);

    // Generate processes whenever numProcesses changes
    useEffect(() => {
        setProcesses(generateProcess(numProcesses));
    }, [numProcesses]);

    return (
        <div className="p-4">
            {/* User Input for Number of Processes */}
            <div className="mb-3">
                <label className="mr-2 font-medium">Enter Number of Processes:</label>
                <input
                    type="number"
                    min="1"
                    value={numProcesses}
                    onChange={(e) => setNumProcesses(Number(e.target.value))}
                    className="border p-2 rounded w-20"
                />
                <button 
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setProcesses(generateProcess(numProcesses))}
                >
                    Generate
                </button>
            </div>

            {/* Process Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">PID</th>
                        <th className="border p-2">Arrival Time</th>
                        <th className="border p-2">Burst Time</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((p) => (
                        <tr key={p.pid} className="text-center">
                            <td className="border p-2">{p.pid}</td>
                            <td className="border p-2">{p.arrivalTime}</td>
                            <td className="border p-2">{p.burstTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
