import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function GradientButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: GradientButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          relative px-8 py-4 font-semibold rounded-lg
          text-white transition-all duration-300
          overflow-hidden group
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl active:scale-95 cursor-pointer"}
          ${className}
        `}
      >
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 z-0" />

        {/* Animated overlay gradient on hover */}
        <div className="gradient-flow-layer absolute inset-0 z-0">
          <div className="gradient-flow-track">
            <div className="gradient-flow-segment" />
            <div className="gradient-flow-segment" />
          </div>
        </div>

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .gradient-flow-layer {
          overflow: hidden;
          opacity: 0;
          transition: opacity 260ms ease-out;
        }

        .gradient-flow-track {
          width: 200%;
          height: 100%;
          display: flex;
          animation: gradient-flow 3s linear infinite;
          will-change: transform;
        }

        .gradient-flow-segment {
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(37, 99, 235, 0.78) 0%,
            rgba(14, 116, 144, 0.76) 20%,
            rgba(13, 148, 136, 0.74) 40%,
            rgba(45, 212, 191, 0.72) 60%,
            rgba(56, 189, 248, 0.74) 80%,
            rgba(37, 99, 235, 0.78) 100%
          );
        }

        .group:hover .gradient-flow-layer {
          opacity: 0.72;
        }
      `}</style>
    </>
  );
}
