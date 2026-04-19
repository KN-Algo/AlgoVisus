import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STICKY_NAVBAR_OFFSET = 80;
const MAX_SCROLL_ATTEMPTS = 20;

function scrollToHashTarget(hash: string) {
  const targetId = decodeURIComponent(hash.replace("#", ""));

  if (targetId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return false;

  const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(0, targetTop - STICKY_NAVBAR_OFFSET),
    behavior: "smooth",
  });

  return true;
}

export function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    let attemptCount = 0;
    let frameId = 0;

    const tryScroll = () => {
      if (scrollToHashTarget(location.hash)) return;

      attemptCount += 1;

      if (attemptCount < MAX_SCROLL_ATTEMPTS) {
        frameId = window.requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  return null;
}
