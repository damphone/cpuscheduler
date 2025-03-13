export function sjfScheduler(processes){
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let schedule = [];

    while (sortedProcesses.length > 0) {
        const readyProcesses = sortedProcesses.filter(process => process.arrivalTime <= currentTime);
        if (readyProcesses.length === 0) {
            currentTime++;
            continue;
        }

        const shortestProcess = readyProcesses.reduce((prev, curr) => prev.burstTime < curr.burstTime ? prev : curr);
        const index = sortedProcesses.indexOf(shortestProcess);
        sortedProcesses.splice(index, 1);

        let startTime = Math.max(currentTime, shortestProcess.arrivalTime);
        let completionTime = startTime + shortestProcess.burstTime;
        let turnaroundTime = completionTime - shortestProcess.arrivalTime;
        let waitingTime = turnaroundTime - shortestProcess.burstTime;

        schedule.push({
            ...shortestProcess,
            startTime,
            completionTime,
            turnaroundTime,
            waitingTime,
        });

        currentTime = completionTime;
    }

    return schedule;
}