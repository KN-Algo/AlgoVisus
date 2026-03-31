import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TWEN_MIN_ENABLE = "twenty_minutes_rule_enabled";

export default function Zasada20min() {
  const navigate = useNavigate();

  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(TWEN_MIN_ENABLE);
    return saved ? JSON.parse(saved) : true; // domyślnie włączone
  });

  // Zapis do localStorage przy zmianie
  useEffect(() => {
    localStorage.setItem(TWEN_MIN_ENABLE, JSON.stringify(enabled));
  }, [enabled]);

  const handleToggle = () => {
    setEnabled((prev) => !prev);
    navigate("/"); // przekierowanie do main po kliknięciu
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10 gap-6">
      <h1 className="text-3xl font-bold">Reguła 20-20-20 minut</h1>
      <p className="text-gray-600 text-center max-w-md">
        Zasada 20-20-20 polega na odejściu od komputera co 20 minut. Wybierając
        to ćwiczenie będziesz otrzymywał powiadomienia wraz z ekranem mówiące ci
        kiedy powinieneś odejść od ekranu a kiedy wrócić do pracy.
      </p>

      <button
        onClick={handleToggle}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors
          ${enabled ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
      >
        {enabled ? "Włączone ✅" : "Wyłączone ❌"}
      </button>
    </div>
  );
}
