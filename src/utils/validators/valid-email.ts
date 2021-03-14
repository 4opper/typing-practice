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
