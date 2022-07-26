import bcrypt from "bcrypt";

const genarateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export default genarateHashPassword;
