import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import type { LoggedInUser } from "../entities/user";
import {navigate} from "@reach/router";

export default function useCurrentUser(): LoggedInUser | null {
  const { state: { user } = { user: null } } = useContext(LogedInUser);
  if (user === null) {
    navigate("/login");
  }
  return user;
}

