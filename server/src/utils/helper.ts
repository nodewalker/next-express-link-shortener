import * as bcrypt from "bcrypt";

export const hash = async (pass: string) => {
  const hash = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, hash);
};
export const verify = async (pass: string, hash: string) => {
  return await bcrypt.compare(pass, hash);
};
