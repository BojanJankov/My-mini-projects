import jwt from "jsonwebtoken";

export const createAccessToken = (clientId) => {
  return jwt.sign({ clientId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const createRefreshToken = (clientId) => {
  return jwt.sign({ clientId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
