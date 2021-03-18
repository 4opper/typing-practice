import * as t from "runtypes";
import {Admin} from "./admin";
import {Moderator} from "./moderator";

export const UserWithDashboardAccess = t.Union(Admin, Moderator);

export type UserWithDashboardAccess = t.Static<typeof UserWithDashboardAccess>