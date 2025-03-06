'use client';

import React from "react";
import { useState } from "react";
import ProcessTable from "../../components/processtable";
import AlgorithmSelector from "../../components/algorithmselector";
import { fifoScheduler } from "../../algorithms/FIFO";

export default function Home() {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);

  const handleProcessesGenerated = (newProcesses) => {
    setProcesses(newProcesses);
  };

  const onRunSimulation = (selectedAlgorithms, timeQuantum) => {
    const results = selectedAlgorithms.map((algo) => {
      switch (algo) {
        case "FIFO":
          return fifoScheduler(processes);
        default:
          return [];
      }
    });
    setResults(results);
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">CPU Scheduler Simulator</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ProcessTable onProcessesGenerated={handleProcessesGenerated} />
        </div>
        <div>
          <AlgorithmSelector onRunSimulation={onRunSimulation} />
        </div>
      </div>
      <div className="mt-8">
        {results.map((result, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold mb-2">
              {result.length > 0 ? result[0].algorithm : "No Algorithm"}
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">PID</th>
                  <th className="border p-2">Start Time</th>
                  <th className="border p-2">Completion Time</th>
                  <th className="border p-2">Turnaround Time</th>
                  <th className="border p-2">Waiting Time</th>
                </tr>
              </thead>
              <tbody>
                {result.map((p) => (
                  <tr key={p.pid} className="text-center">
                    <td className="border p-2">{p.pid}</td>
                    <td className="border p-2">{p.startTime}</td>
                    <td className="border p-2">{p.completionTime}</td>
                    <td className="border p-2">{p.turnaroundTime}</td>
                    <td className="border p-2">{p.waitingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
    </div>
  );
}
