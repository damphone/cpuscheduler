export function fifoScheduler(processes) {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let schedule = [];

    sortedProcesses.forEach((process) => {
        let startTime = Math.max(currentTime, process.arrivalTime);
        let completionTime = startTime + process.burstTime;
        let turnaroundTime = completionTime - process.arrivalTime;
        let waitingTime = turnaroundTime - process.burstTime;
        let responseTime = startTime - process.arrivalTime;

        schedule.push({
            ...process,
            startTime,
            completionTime,
            turnaroundTime,
            waitingTime,
            responseTime
        });

        currentTime = completionTime;
    });

    return schedule;
}
