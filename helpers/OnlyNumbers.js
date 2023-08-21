import { p2e } from "./NumberConverter";

export const OnlyNum = (s) => {
  if (!s) return;
  const temp = s.replace(/\D/g, "");
  return p2e(temp);
};
