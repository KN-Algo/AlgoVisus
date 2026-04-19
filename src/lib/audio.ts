type BrowserAudioContextConstructor = typeof AudioContext;

declare global {
  interface Window {
    webkitAudioContext?: BrowserAudioContextConstructor;
  }
}

let sharedAudioContext: AudioContext | null = null;

function getAudioContextConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.AudioContext ?? window.webkitAudioContext ?? null;
}

function getSharedAudioContext() {
  if (sharedAudioContext && sharedAudioContext.state !== "closed") {
    return sharedAudioContext;
  }

  const AudioContextConstructor = getAudioContextConstructor();

  if (!AudioContextConstructor) {
    return null;
  }

  sharedAudioContext = new AudioContextConstructor();
  return sharedAudioContext;
}

async function ensureRunningAudioContext(audioContext: AudioContext) {
  if (audioContext.state !== "running") {
    try {
      await audioContext.resume();
    } catch {
      return false;
    }
  }

  return audioContext.state === "running";
}

export async function playTone(
  frequency: number,
  duration: number,
  volume = 0.3,
) {
  const audioContext = getSharedAudioContext();

  if (!audioContext) {
    return false;
  }

  const isReady = await ensureRunningAudioContext(audioContext);

  if (!isReady) {
    return false;
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const startTime = audioContext.currentTime;
  const endTime = startTime + duration;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, endTime);

  oscillator.start(startTime);
  oscillator.stop(endTime);
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.disconnect();
  };

  return true;
}

export async function primeMediaElementPlayback(
  mediaElement: HTMLMediaElement | null,
) {
  if (!mediaElement) {
    return false;
  }

  const previousMuted = mediaElement.muted;
  const previousVolume = mediaElement.volume;
  const previousCurrentTime = mediaElement.currentTime;

  try {
    mediaElement.muted = true;
    mediaElement.volume = 0;
    mediaElement.currentTime = 0;

    await mediaElement.play();
    mediaElement.pause();
    mediaElement.currentTime = 0;

    return true;
  } catch {
    return false;
  } finally {
    mediaElement.muted = previousMuted;
    mediaElement.volume = previousVolume;
    mediaElement.currentTime = previousCurrentTime;
  }
}
