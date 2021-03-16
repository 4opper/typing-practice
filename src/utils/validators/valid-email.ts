import * as t from "runtypes";

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const ValidEmail = t.String.withBrand('ValidEmail').withConstraint((email) => EMAIL_REGEXP.test(email))

export type ValidEmail = t.Static<typeof ValidEmail>
