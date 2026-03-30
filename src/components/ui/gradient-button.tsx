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
        <div className="gradient-flow-layer group-hover:opacity-[0.72] absolute inset-0 z-0">
          <div className="gradient-flow-track animate-gradient-flow">
            <div className="gradient-flow-segment" />
            <div className="gradient-flow-segment" />
          </div>
        </div>

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
