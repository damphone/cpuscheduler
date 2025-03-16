'use client';

import React, { useState, useEffect, useCallback } from "react";
import ProcessTable from "../../components/processtable";
import AlgorithmSelector from "../../components/algorithmselector";
import { fifoScheduler } from "../../algorithms/FIFO";
import { sjfScheduler } from "../../algorithms/SJF";
import { stcfScheduler } from "../../algorithms/STCF";
import { rrScheduler } from "../../algorithms/RR";
import { mlfqScheduler } from "../../algorithms/MLFQ";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";

Chart.register(...registerables);

export default function Home() {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState({});
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const handleProcessesGenerated = useCallback((newProcesses) => {
    setProcesses(newProcesses);
  }, []);

  const onRunSimulation = useCallback((selectedAlgorithms, timeQuantum) => {
    if (processes.length === 0) {
      alert("No processes available for simulation.");
      return;
    }

    const results = {};
    selectedAlgorithms.forEach((algo) => {
      switch (algo) {
        case "FIFO":
          results[algo] = fifoScheduler(processes);
          break;
        case "SJF":
          results[algo] = sjfScheduler(processes);
          break;
        case "STCF":
          results[algo] = stcfScheduler(processes);
          break;
        case "RR":
          results[algo] = rrScheduler(processes, timeQuantum);
          break;
        case "MLFQ":
          results[algo] = mlfqScheduler(processes);
          break;
        default:
          results[algo] = [];
      }
    });

    setResults(results);
    animateChart(results);
  }, [processes]);

  const animateChart = useCallback((results) => {
    const labels = Object.keys(results);
    const datasets = [
      {
        label: "Avg Turnaround Time",
        data: labels.map(algo => results[algo].reduce((sum, p) => sum + p.turnaroundTime, 0) / results[algo].length),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Avg Waiting Time",
        data: labels.map(algo => results[algo].reduce((sum, p) => sum + p.waitingTime, 0) / results[algo].length),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Avg Response Time",
        data: labels.map(algo => results[algo].reduce((sum, p) => sum + p.responseTime, 0) / results[algo].length),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      }
    ];
  
    setChartData({ labels, datasets });
  }, []);
  
  

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
        {Object.keys(results).length > 0 ? (
          Object.keys(results).map((algo, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-bold mb-2">{algo}</h2>
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
                  {results[algo].length > 0 ? (
                    results[algo].map((p) => (
                      <tr key={p.pid} className="text-center">
                        <td className="border p-2">{p.pid}</td>
                        <td className="border p-2">{p.startTime}</td>
                        <td className="border p-2">{p.completionTime}</td>
                        <td className="border p-2">{p.turnaroundTime}</td>
                        <td className="border p-2">{p.waitingTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="border p-2 text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Run a simulation to see results.</p>
        )}
      </div>
      <div className="mt-8">
      <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
  <Bar
    data={chartData}
    options={{ 
      responsive: true, 
      scales: { 
        x: { stacked: false }, 
        y: { stacked: false }
      },
      barPercentage: 0.7, 
      categoryPercentage: 0.7
    }}
  />
</motion.div>
      </div>
    </div>
  );
}
