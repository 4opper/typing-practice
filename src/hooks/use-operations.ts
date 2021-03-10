import Services from "../services";
import { useContext } from "react";
import type { LoggedInUser, User } from "../entities/user";

export default function useOperations(user: User, currentUser: LoggedInUser) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
