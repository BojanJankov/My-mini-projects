import { AuthModel } from "../model/auth.model.js";
import { verifyAccessToken } from "../const/jwt.const.js";

export const validateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) throw new Error();

    const token = authorizationHeader.split(" ")[1];

    const { userId } = verifyAccessToken(token);

    await AuthModel.getUserById(userId);

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
