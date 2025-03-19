import { test as base, expect } from '@playwright/test';
import { PlayPage } from '../pages/playPage.page';

type GameFixtures = {
  playPage: PlayPage;
};

const test = base.extend<GameFixtures>({
    playPage: async ({ page }, use) => {
        const playPage = new PlayPage(page);
        await playPage.goto();
        await use(playPage);
    },
});

export { test, expect };