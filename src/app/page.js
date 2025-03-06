import React from "react";
import ProcessTable from "../../components/processtable";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Hello World!</h1>
      <p className="mt-3 text-2xl">Welcome to my Next.js app!</p>
      <ProcessTable />
    </div>
  );
}
