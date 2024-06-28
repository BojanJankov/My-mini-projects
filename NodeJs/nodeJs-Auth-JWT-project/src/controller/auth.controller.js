import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../const/jwt.const.js";
import { AuthModel } from "../model/auth.model.js";

export class AuthController {
  static async registerUser(req, res) {
    try {
      const newUser = await AuthModel.registerUser(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const foundUser = await AuthModel.loginUser(req.body);

      const accesToken = createAccessToken(foundUser.id);
      const refreshToken = createRefreshToken(foundUser.id);

      res.set("access-token", accesToken);
      res.set("refresh-token", refreshToken);

      await AuthModel.saveRefreshToken(foundUser.id, refreshToken);

      return res.json(foundUser);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: error.message });
    }
  }

  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Error();

      const { userId } = verifyRefreshToken(refreshToken);

      const foundUser = await AuthModel.getUserById(userId);

      const refreshTokenExists = foundUser.refreshTokens.some(
        (token) => token === refreshToken
      );

      if (!refreshTokenExists) throw new Error();

      const accessToken = createAccessToken(foundUser.id);

      res.set("access-token", accessToken);

      return res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(403);
    }
  }

  static async logoutUser(req, res) {
    try {
      const refreshToken = res.headers["refresh-token"];

      const { userId } = verifyRefreshToken(refreshToken);

      await AuthModel.deleteRefreshToken(userId);

      return res, sendStatus(204);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async logoutAll(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Error();

      const { userId } = verifyRefreshToken(refreshToken);

      await AuthModel.deleteAllRefreshTokens(userId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }
}
