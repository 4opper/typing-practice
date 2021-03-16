import * as t from "runtypes";

const PASSWORD_REGEXP = /[a-zA-Z0-9]{4,}/

export const ValidPassword = t.String.withBrand('ValidPassword').withConstraint((password) => PASSWORD_REGEXP.test(password))

export type ValidPassword = t.Static<typeof ValidPassword>