import { PersistentSettingButton } from "../components/persistantSettingButton";

export const SETTINGS = [
  { key: "ust1", label: "Ust 1" },
  { key: "ust2", label: "Ust 2" },
  { key: "ust3", label: "Ust 3" },
  { key: "testPushApiBlock", label: "Blokuj TestPushApi" },
] as const;

function Ustawienia() {
  return (
    <div className="min-h-screen w-full px-8 bg-gray-400 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-5xl font-bold">Ustawienia</h1>

      <div className="w-full max-w-md space-y-4">
        {SETTINGS.map((setting) => (
          <div key={setting.key} className="flex justify-between items-center">
            <span>{setting.label}</span>
            <PersistentSettingButton storageKey={setting.key} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ustawienia;
