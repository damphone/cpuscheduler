export function mlfqScheduler(processes) {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let schedule = [];
    let queue1 = [];
    let queue2 = [];
    let queue3 = [];

    sortedProcesses.forEach((process) => {
        let startTime = Math.max(currentTime, process.arrivalTime);
        let completionTime = startTime + process.burstTime;
        let turnaroundTime = completionTime - process.arrivalTime;
        let waitingTime = turnaroundTime - process.burstTime;

        if (process.burstTime <= 4) {
            queue1.push({
                ...process,
                startTime,
                completionTime,
                turnaroundTime,
                waitingTime,
            });
        } else if (process.burstTime <= 8) {
            queue2.push({
                ...process,
                startTime,
                completionTime,
                turnaroundTime,
                waitingTime,
            });
        } else {
            queue3.push({
                ...process,
                startTime,
                completionTime,
                turnaroundTime,
                waitingTime,
            });
        }

        currentTime = completionTime;
    });

    schedule = [...queue1, ...queue2, ...queue3];
    return schedule;
}