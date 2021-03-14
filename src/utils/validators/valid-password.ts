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
