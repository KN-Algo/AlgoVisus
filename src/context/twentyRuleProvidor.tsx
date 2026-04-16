import { useState, useEffect } from "react";
import { TWEN_MIN_ENABLE } from "../pages/exercises_Zasada20-20-20";
import { TwentyRuleContext } from "./twentyRuleContext";

export const TwentyRuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(TWEN_MIN_ENABLE);
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem(TWEN_MIN_ENABLE, JSON.stringify(enabled));
  }, [enabled]);

  return (
    <TwentyRuleContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </TwentyRuleContext.Provider>
  );
};
