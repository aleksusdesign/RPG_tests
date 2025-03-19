import { Page, Locator } from '@playwright/test';
import { User } from 'types/users/users.type';

export class LoginForm {
  private readonly emailInput: Locator = this.page.getByRole('textbox', { name: 'Email' });
  private readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });
  private readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

  constructor(private page: Page) {}

  async login(user: User) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}