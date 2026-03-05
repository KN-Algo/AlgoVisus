type timerFun = (now: number) => void;
const INTERVAL_TIME: number = 100;

const timers = new Set<timerFun>();
let interval: ReturnType<typeof setInterval> | null = null;

function emit() {
  const now = Date.now();
  timers.forEach((timerFun) => timerFun(now));
}

function start() {
  if (interval !== null) return;
  interval = setInterval(emit, INTERVAL_TIME);
}

function stop() {
  if (!interval) return;
  clearInterval(interval);
  interval = null;
}

export function subscribe(timer: timerFun) {
  timers.add(timer);
  if (timers.size === 1) start();
  return () => {
    timers.delete(timer);
    if (timers.size === 0) stop();
  };
}
