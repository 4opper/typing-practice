import UserService from "./user-service";
import { User} from "../entities/user";
import {ValidEmail} from "../utils/validators/valid-email";
import {ValidPassword} from "../utils/validators/valid-password";
import {Credentials} from "../hooks/use-login";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public validateCreds(creds: Credentials) {
    const email = ValidEmail.check(creds.email);
    const password = ValidPassword.check(creds.password);

    return { email, password };
  }

  public async login(email: ValidEmail, password: ValidPassword): Promise<User> {
    const user = await this.userService.getUserByCreds(email, password)

    return user
  }
}
