import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type ContextType = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export const TwentyRuleContext = createContext<ContextType | null>(null);
