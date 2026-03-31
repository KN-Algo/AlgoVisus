interface ToggleProps {
  on: boolean;
  onToggle: () => void;
}

export function ToggleButton({ on, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-14 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        on ? "bg-black" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          on ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>
  );
}
