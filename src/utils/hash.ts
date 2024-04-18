import { createHash } from "crypto";

export const hash = (input: string) => {
  return createHash("md5").update(input).digest("hex");
};
