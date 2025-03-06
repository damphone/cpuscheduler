'use client';

import { useState } from "react";

export default function AlgorithmSelector({ onRunSimulation }) {
    const algorithms = ["FIFO", "SJF", "STCF", "RR", "MLFQ"];
    const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
    const [timeQuantum, setTimeQuantum] = useState(2); // Default quantum for RR

    const handleCheckboxChange = (algorithm) => {
        setSelectedAlgorithms((prev) =>
            prev.includes(algorithm)
                ? prev.filter((item) => item !== algorithm) // Unselect
                : [...prev, algorithm] // Select
        );
    };

    const handleRun = () => {
        onRunSimulation(selectedAlgorithms, timeQuantum);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Select Scheduling Algorithms</h2>
            <div className="mb-3">
                {algorithms.map((algo) => (
                    <label key={algo} className="block">
                        <input
                            type="checkbox"
                            value={algo}
                            checked={selectedAlgorithms.includes(algo)}
                            onChange={() => handleCheckboxChange(algo)}
                            className="mr-2"
                        />
                        {algo}
                    </label>
                ))}
            </div>

            {/* Time Quantum Input (Only when RR is selected) */}
            {selectedAlgorithms.includes("RR") && (
                <div className="mb-3">
                    <label className="mr-2 font-medium">Time Quantum:</label>
                    <input
                        type="number"
                        min="1"
                        value={timeQuantum}
                        onChange={(e) => setTimeQuantum(Number(e.target.value))}
                        className="border p-2 rounded w-20"
                    />
                </div>
            )}

            <button 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleRun}
            >
                Run Selected Algorithms
            </button>
        </div>
    );
}
