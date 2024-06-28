import { Client } from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export class ClientService {
  static async getAllClients() {
    const clients = await Client.find({});

    return clients;
  }
  static async getClientById(clientId) {
    const foundClient = await Client.findById(clientId);

    if (!foundClient) throw new Error("Clinet Not Found");

    return foundClient;
  }
  static async registerClient(clientData) {
    const clients = await this.getAllClients();

    const emailExists = clients.find(
      (client) => client.email === clientData.email
    );

    if (emailExists) throw new Error("Email already exists");

    const { firstName, lastName, email, password } = clientData;

    const hashedPassword = await bcrypt.hash(password, 8);

    const newClient = new Client({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const createdClient = await newClient.save();

    // Method for deleting password field when we return client data in response(created in client.model.js file)
    createdClient.toJSON();

    return createdClient;
  }

  static async loginClient({ password, email }) {
    const clients = await this.getAllClients();

    const foundClient = clients.find((client) => client.email === email);

    if (!foundClient) throw new Error("Invalid Credentials!");

    const isPasswordValid = await bcrypt.compare(
      password,
      foundClient.password
    );

    if (!isPasswordValid) throw new Error("Invalid Credentials!");

    return foundClient;
  }

  static async saveRefreshToken(clientId, token) {
    const foundClient = await this.getClientById(clientId);

    if (!foundClient) throw new Error();

    foundClient.refreshTokens.push(token);

    await foundClient.save();
  }
  static async deleteAllRefreshTokens(clientId) {
    const foundClient = await this.getClientById(clientId);

    if (!foundClient) throw new Error();

    foundClient.refreshTokens = [];

    await foundClient.save();
  }
}
