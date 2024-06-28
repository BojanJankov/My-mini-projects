import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../const/jwt.const.js";
import { clientJoiSchema } from "../schemas/client.schema.js";
import { ClientService } from "../services/auth.service.js";

export class ClientController {
  static async getAllClients(req, res) {
    try {
      const clients = await ClientService.getAllClients();

      return res.json(clients);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async registerClient(req, res) {
    try {
      await clientJoiSchema.validateAsync(req.body, { abortEarly: false });

      const registerdClient = await ClientService.registerClient(req.body);

      return res.status(201).json(registerdClient);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
  static async loginClient(req, res) {
    try {
      const client = await ClientService.loginClient(req.body);

      const accessToken = createAccessToken(client._id);
      const refreshToken = createRefreshToken(client._id);

      res.set("access-token", accessToken);
      res.set("refresh-token", refreshToken);

      await ClientService.saveRefreshToken(client._id, refreshToken);

      return res.json(client);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Error();

      const { clientId } = verifyRefreshToken(refreshToken);

      const foundClient = await ClientService.getClientById(clientId);

      const refreshTokenExists = foundClient.refreshTokens.some(
        (token) => token === refreshToken
      );

      if (!refreshTokenExists) throw new Error();

      const accessToken = createAccessToken(foundClient._id);

      res.set("access-token", accessToken);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(403);
    }
  }

  static async logOutClient(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Error();

      const { clientId } = verifyRefreshToken(refreshToken);

      await ClientService.deleteAllRefreshTokens(clientId);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
}
