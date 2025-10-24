import { Page, expect } from '@playwright/test';

export default class SliderPage {
  readonly page: Page;
  readonly sliderLink;
  readonly slider3;
  readonly sliderValue;

  constructor(page: Page) {
    this.page = page;
    this.sliderLink = page.getByRole('link', { name: 'Drag & Drop Sliders' });
    this.slider3 = page.locator('#slider3').getByRole('slider');
    this.sliderValue = page.locator('#rangeSuccess'); // locator showing slider value
  }

  async navigate() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground/');
  }

  async openSliderPage() {
    await this.sliderLink.click();
  }

  async setSliderValue(value: string) {
    // Some sliders may not allow fill(), you can use drag or keyboard as needed
    await this.slider3.fill('95');
  }

async verifySliderValue(value: string) {
    await expect(this.page.locator('#rangeSuccess')).toHaveText(value);
  }
}