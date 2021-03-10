import {Role} from "../entities/role";
import {Admin} from "../entities/admin";
import {Client} from "../entities/client";
import {Moderator} from "../entities/moderator";
import {Operation} from "../entities/operation";
import type {LoggedInUser, User} from "../entities/user";
import type {RoleToUser} from "../entities/role-to-user";

export default class UserService {
  static availableOperations = {
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
  }

  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  async getUserByCreds(email: string, password: string): Promise<User> {
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
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations(user: User, currentUser: LoggedInUser): Operation[] {
    if (!currentUser) {
      return []
    }

    return UserService.availableOperations[currentUser.role][user.role]
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
