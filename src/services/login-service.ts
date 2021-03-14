import UserService from "./user-service";
import { User} from "../entities/user";
import {ValidEmail} from "../utils/validators/valid-email";
import {ValidPassword} from "../utils/validators/valid-password";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: ValidEmail, password: ValidPassword): Promise<User> {
    const user = await this.userService.getUserByCreds(email.value, password.value)

    return user
  }
}
