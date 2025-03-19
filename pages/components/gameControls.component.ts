import { Page, Locator } from '@playwright/test';

export class GameControls {
    public readonly clickButton: Locator = this.page.getByRole('button', { name: 'Click me', exact: false });
    public readonly playAgainButton: Locator = this.page.getByRole('button', { name: 'Play Again'});;
    private readonly fileInput: Locator = this.page.locator('input[type="file"]');
    private readonly textInput: Locator = this.page.locator('input:not([type="file"])').first();
    private readonly slider: Locator = this.page.getByRole('slider');
    public readonly maxLevelMessage: Locator = this.page.locator('span', { hasText: "You've reached the highest level!" });
    public readonly clickerSuccessMessage: Locator = this.page.locator('[data-task="clicker"]');
    public readonly uploaderSuccessMessage: Locator = this.page.locator('[data-task="uploader"]');
    public readonly typerSuccessMessage: Locator = this.page.locator('[data-task="typer"]');
    public readonly sliderSuccessMessage: Locator = this.page.locator('[data-task="slider"]');

    constructor(private page: Page) { }

    async completeClickTask() {
        const targetClicks = await this.getTargetClickCount();
        await this.performClicks(targetClicks);
    }

    async getTargetClickCount(): Promise<number> {
        const initialText = await this.clickButton.textContent();
        const match = initialText?.match(/Click me (\d+) times/);
        return match ? parseInt(match[1], 10) : 0;
    }

    async performClicks(targetClicks: number) {
        for (let i = 0; i < targetClicks; i++) {
            await this.clickButton.click();
            await this.page.waitForTimeout(100); // Wait for UI update
        }
    }

    async getClickButtonText(): Promise<string | null> {
        return await this.clickButton.textContent();
    }

    async completeUploadTask(file: {
        name: string,
        mimeType: string,
        buffer: Buffer
    }) {
        await this.fileInput.setInputFiles(file);
    }

    async completeTypeTask(textToType: string) {
        await this.textInput.fill(textToType);
    }
    
    //TODO: refactor this method
    async completeSlideTask(targetAmount: string) {
        const sliderBox = await this.slider.boundingBox();
        if (!sliderBox) {
            throw new Error('Slider bounding box not found');
        }
        let isCompleted = false;
        while (!isCompleted) {
            let srcBound = await this.slider.boundingBox();
            if (srcBound) {
                await this.page.mouse.down();
                await this.page.mouse.move(srcBound.x + 40, srcBound.y);
                await this.page.mouse.up();
                let text = await this.slider.getAttribute('aria-valuenow');
                if (text == targetAmount) {
                    isCompleted = true;
                }
            }
        }
    }
}