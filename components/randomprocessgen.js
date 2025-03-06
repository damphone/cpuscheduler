export function generateProcess(numProcesses = 5){
    return (
        Array.from({length: numProcesses}, (_, i) => generateRandomProcess(i + 1))
    )
}

export function generateRandomProcess(pid) {
    const process = {
        pid,
        arrivalTime: Math.floor(Math.random() * 10),
        burstTime: Math.floor(Math.random() * 10) + 1,
    };
    return process;
}