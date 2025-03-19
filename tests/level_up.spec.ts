import { Users } from '@data/users/users';
import { test, expect } from '../utils/baseTest';

test.describe('[Play][Level Up] Level up - Happy path', () => {
  const EXPECTED_CLICKER_SUCCESS_MESSAGE = 'Great job! You levelled up';
  const EXPECTED_UPLOADER_SUCCESS_MESSAGE = 'File selected, level up!';
  const EXPECTED_TYPER_SUCCESS_MESSAGE = 'Dolar sit amet!';
  const EXPECTED_SLIDER_SUCCESS_MESSAGE = 'Slid to the next level!';

  //TODO: add negative scenarios
  //TODO: make tests more specific. In the task was mentioned only one test.
  test('should login and level up character to maximum level', async ({ playPage }) => {
    // Login through the component
    await playPage.login(Users.getSimpleUser());

    // Create character
    await playPage.createCharacter('Knight');
    await expect(playPage.levelStatSpan, 'Level after character creating should be equal 1').toHaveText('1');

    // Click task with verification
    const targetClicks = await playPage.gameControls.getTargetClickCount();
    expect(targetClicks, 'Target click count should be greater than 0').toBeGreaterThan(0);

    //TODO: move to actions
    for (let i = targetClicks; i > 0; i--) {
      await playPage.gameControls.performClicks(1);
      await expect(playPage.gameControls.clickButton, `Button text should update to "Click me ${i - 1} times" after click ${targetClicks - i + 1}`).toHaveText(`Click me ${i - 1} times`);
    }

    await expect(playPage.gameControls.clickButton, 'Click button should be disabled after reaching 0').toBeDisabled();
    await expect(playPage.gameControls.clickerSuccessMessage, `Clicker success message should be "${EXPECTED_CLICKER_SUCCESS_MESSAGE}"`).toHaveText(EXPECTED_CLICKER_SUCCESS_MESSAGE);
    await expect(playPage.levelStatSpan, 'Level after click task should be equal 2').toHaveText('2');

    // Upload task with verification
    await playPage.gameControls.doUploadTask({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Test file content'),
    });
    await expect(playPage.gameControls.uploaderSuccessMessage, `Uploader success message should be "${EXPECTED_UPLOADER_SUCCESS_MESSAGE}"`).toHaveText(EXPECTED_UPLOADER_SUCCESS_MESSAGE);
    await expect(playPage.levelStatSpan, 'Level after upload task should be equal 3').toHaveText('3');

    // Type task with verification
    await playPage.gameControls.doTypeTask('Lorem Ipsum');
    await expect(playPage.gameControls.typerSuccessMessage, `Typer success message should be "${EXPECTED_TYPER_SUCCESS_MESSAGE}"`).toHaveText(EXPECTED_TYPER_SUCCESS_MESSAGE);
    await expect(playPage.levelStatSpan, 'Level after typer task should be equal 4').toHaveText('4');

    // Slider task with verification
    await playPage.gameControls.doSlideTask('100');
    await expect(playPage.gameControls.sliderSuccessMessage, `Typer success message should be "${EXPECTED_SLIDER_SUCCESS_MESSAGE}"`).toHaveText(EXPECTED_SLIDER_SUCCESS_MESSAGE);
    await expect(playPage.gameControls.playAgainButton, 'Play again button should be visible').toBeVisible();
    await expect(playPage.levelStatSpan, 'Level after slider task should be equal 5').toHaveText('5');

    // Verify max level (adjust based on actual level indicator)
    await expect(playPage.gameControls.maxLevelMessage).toBeVisible();
  });
});