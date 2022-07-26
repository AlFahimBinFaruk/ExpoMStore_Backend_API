import jwt from "jsonwebtoken";

const genarateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export default genarateToken;
