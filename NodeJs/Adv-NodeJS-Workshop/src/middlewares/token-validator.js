import { verifyAccessToken } from "../const/jwt.const.js";
import { ClientService } from "../services/auth.service.js";

export const tokenValidator = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) throw new Error();

    const token = authorizationHeader.split(" ")[1];

    const { clientId } = verifyAccessToken(token);

    await ClientService.getClientById(clientId);

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
