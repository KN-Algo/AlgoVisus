import { useContext } from "react";
import { TwentyRuleContext } from "./twentyRuleContext";

export const useTwentyRule = () => {
  const ctx = useContext(TwentyRuleContext);
  if (!ctx) throw new Error("useTwentyRule outside provider");
  return ctx;
};
