import { Locator, Page } from "@playwright/test";
import { User } from "types/users/users.type";
import { BasePage } from "@pages/basePage";
import { GameControls } from "@pages/components/gameControls.component";
import { LoginForm } from "@pages/components/loginForm.component";

export class PlayPage extends BasePage {
  readonly gameControls: GameControls = new GameControls(this.page);
  readonly loginForm: LoginForm = new LoginForm(this.page);
  private loginButton: Locator = this.page.getByTestId('login-button');
  private readonly characterNameInput: Locator = this.page.getByRole('textbox', { name: 'Character name' });
  private readonly startButton: Locator = this.page.getByRole('button', { name: 'Start!' });
  public readonly levelStatSpan: Locator = this.page.locator('div[data-character-stats="Level"] span');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('/play');
  }

  async login(user: User) {
    await this.loginButton.click();
    await this.loginForm.login(user);
  }

  async createCharacter(characterName: string) {
    await this.characterNameInput.fill(characterName);
    await this.startButton.click();
  }
}