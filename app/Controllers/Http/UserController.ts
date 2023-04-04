// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UserController {
  public async register({ request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const firstName = request.input("first_name");
    const lastName = request.input("last_name");

    // Check if the email is already in use
    const emailExists = await User.findBy("email", email);
    if (emailExists) {
      return response.status(400).send({ message: "Email is already in use." });
    }
    // Create a new user
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    return response
      .status(201)
      .send({ message: "User successfully registered." });
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      const token = await auth.use("api").attempt(email, password);
      return response.status(200).send({ token: token.toJSON() });
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .send({ message: "Invalid email or password." });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use("api").revoke();
    return { message: "Logged out successfully." };
  }
}
