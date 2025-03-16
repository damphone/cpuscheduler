export function rrScheduler(processes, timeQuantum){
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let schedule = [];
    let queue = [...sortedProcesses];

    while (queue.length > 0) {
        const process = queue.shift();

        if (process.arrivalTime > currentTime) {
            currentTime = process.arrivalTime;
        }

        let startTime = currentTime;
        let remainingBurstTime = process.burstTime - timeQuantum;

        if (remainingBurstTime > 0) {
            currentTime += timeQuantum;
            queue.push({
                ...process,
                burstTime: remainingBurstTime,
                startTime,
                completionTime: null,
                turnaroundTime: null,
                waitingTime: null,
                responseTime: null,
            });
        } else {
            currentTime += process.burstTime;
            schedule.push({
                ...process,
                startTime,
                completionTime: currentTime,
                turnaroundTime: currentTime - process.arrivalTime,
                waitingTime: currentTime - process.arrivalTime - process.burstTime,
                responseTime: startTime - process.arrivalTime,
            });
        }
    }

    return schedule;
}