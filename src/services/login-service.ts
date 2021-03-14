import UserService from "./user-service";
import { User} from "../entities/user";

export class ValidEmail {
  value: string;

  static from(email: string): ValidEmail {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.test(email)) {
      return new ValidEmail(email)
    }

    throw new Error('Email is not valid')
  }

  private constructor(email: string) {
    this.value = email
  }

  private readonly _type = Symbol("validEmail");
}

export class ValidPassword {
  value: string;

  static from(password: string): ValidPassword {
    const passwordRegex = /[a-zA-Z0-9]{4,}/

    if (passwordRegex.test(password)) {
      return new ValidPassword(password)
    }

    throw new Error('Password is not valid')
  }

  private constructor(password: string) {
    this.value = password
  }

  private readonly _type = Symbol("validPassword");
}

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: ValidEmail, password: ValidPassword): Promise<User> {
    const user = await this.userService.getUserByCreds(email.value, password.value)

    return user
  }
}
