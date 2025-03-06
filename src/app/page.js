import React from "react";
import ProcessTable from "../../components/processtable";
import AlgorithmSelector from "../../components/algorithmselector";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">CPU scheduling algorithm simulation!</h1>
      <ProcessTable />
      <AlgorithmSelector />
    </div>
  );
}
