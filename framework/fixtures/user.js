import { faker } from "@faker-js/faker";

export function generateUser(options) {

        return {
            userID: '02576a48-fd63-404f-8d1f-09025e1d28d6',
            userName: faker.internet.userName(),
            password: options?.password ?? faker.internet.password(32, false, /[a-zA-Z0-9!@#$%^&*]/)
        }
}


