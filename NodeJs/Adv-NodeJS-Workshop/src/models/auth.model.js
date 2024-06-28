import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  refreshTokens: [{ type: String }],
});

// Function that take client and convert to Object and delete password field from him and return without password, called last in register service
clientSchema.methods.toJSON = function () {
  const client = this;
  const clientObj = client.toObject();

  delete clientObj.password;

  return clientObj;
};

export const Client = model("Client", clientSchema);
