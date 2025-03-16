'use client';

import React, { useState, useEffect } from "react";
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
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const handleProcessesGenerated = (newProcesses) => {
    setProcesses(newProcesses);
  };

  const onRunSimulation = (selectedAlgorithms, timeQuantum) => {
    const results = selectedAlgorithms.map((algo) => {
      switch (algo) {
        case "FIFO":
          return fifoScheduler(processes);
        case "SJF":
          return sjfScheduler(processes);
        case "STCF":
          return stcfScheduler(processes);
        case "RR":
          return rrScheduler(processes, timeQuantum);
        case "MLFQ":
          return mlfqScheduler(processes);
        default:
          return [];
      }
    });
    setResults(results);
    animateChart(results);
  };

  const animateChart = (results) => {
    let labels = [];
    let datasets = [];
    let colors = ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(153, 102, 255, 0.6)"];

    results.forEach((result, index) => {
      if (result.length === 0) return;
      let processExecution = result.map(p => ({ x: p.startTime, y: p.burstTime }));
      labels.push(result[0].algorithm);
      datasets.push({
        label: result[0].algorithm,
        data: processExecution,
        backgroundColor: colors[index % colors.length],
        borderWidth: 1,
      });
    });

    setChartData({ labels, datasets });
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
      <div className="mt-8">
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>
          <Bar data={chartData} options={{ responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } }} />
        </motion.div>
      </div>
    </div>
  );
}
