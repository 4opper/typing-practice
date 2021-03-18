import { Role } from "../entities/role";
import { User} from "../entities/user";
import { UserWithDashboardAccess } from "../entities/user-with-dashboard-access";
import { castTo } from "../entities/role-to-user";
import { Operation } from "../entities/operation";
import type { RoleToUser } from "../entities/role-to-user";
import {ValidEmail} from "../utils/validators/valid-email";
import {ValidPassword} from "../utils/validators/valid-password";

const AVAILABLE_OPERATIONS = {
  [Role.CLIENT]: {
    [Role.ADMIN]: [],
    [Role.MODERATOR]: [],
    [Role.CLIENT]: []
  },
  [Role.MODERATOR]: {
    [Role.ADMIN]: [],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR]
  },
  [Role.ADMIN]: {
    [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR]
  }
} as const;

type AVAILABLE_OPERATIONS = typeof AVAILABLE_OPERATIONS;

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  async getUserByCreds(email: ValidEmail, password: ValidPassword): Promise<User> {
    const allUsers = await this.getAllUsers();
    const user = allUsers.find(u => u.email === email.toLowerCase() && u.password === password)

    if (!user) {
      throw new Error('No such user')
    }

    return user
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: RoleToUser[R],
    newRole: R
  ) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getAvailableOperations<U1 extends User, U2 extends UserWithDashboardAccess>(user: U1, currentUser: U2) {
    return AVAILABLE_OPERATIONS[currentUser.role][user.role] as AVAILABLE_OPERATIONS[U2["role"]][U1["role"]];
  }
}
