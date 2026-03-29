import { ToggleButton } from "./ui/toogleButton";
import { useEffect, useState } from "react";

interface Props {
  storageKey: string;
}

export function PersistentSettingButton({ storageKey }: Props) {
  const [isOn, setIsOn] = useState<boolean>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOn));
  }, [isOn, storageKey]);

  return <ToggleButton on={isOn} onToggle={() => setIsOn((prev) => !prev)} />;
}
