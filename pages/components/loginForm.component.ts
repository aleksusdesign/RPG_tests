import { Page, Locator } from '@playwright/test';
import { User } from 'types/users/users.type';

export class LoginForm {
  private readonly emailInput: Locator = this.page.locator('input[type="email"][name="email"]');
  private readonly passwordInput: Locator = this.page.locator('input[type="password"][name="password"]');
  private readonly loginButton: Locator = this.page.locator('button[type="submit"]', { hasText: 'Login' });

  constructor(private page: Page) {}

  async login(user: User) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}