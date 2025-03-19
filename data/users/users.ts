import { User } from "types/users/users.type";

const MOCKED_CONFIG = {
  TEST_ENV: 'sandbox'
}

export const Users = {
  getSimpleUser(): User {
    switch (MOCKED_CONFIG.TEST_ENV) {
      case 'sandbox':
      case 'dev':
      case 'stage':
        return {
          email: 'test@example.com',
          password: 'we_can_encrypt_passwords_with_cryptr'
        };
      default:
        return {
          email: 'test@example.com',
          password: 'we_can_encrypt_passwords_with_cryptr'
        };
    }
  }
};
