import Services from "../services";
import { useContext } from "react";
import type { User } from "../entities/user";
import type {UserWithDashboardAccess} from "../entities/user-with-dashboard-access";

export default function useOperations<U1 extends User, U2 extends UserWithDashboardAccess>(user: U1, currentUser: U2) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
