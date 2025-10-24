import { expect, Page } from "@playwright/test";

export default class SimpleFormDemo {
  private page: Page;
  private messageInput;
  private showMessageButton;

  constructor(page: Page) {
    this.page = page;
    this.messageInput = page.locator("input#user-message");
    this.showMessageButton = page.locator("button#showInput");
  }

  async navigate() {
    // Playwright automatically prepends baseURL from config
    await this.page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
  }

  async enterMessage(message: string) {
    await this.messageInput.fill(message);
  }

  async clickShowMessage() {
    await this.showMessageButton.click();
  }

  async verifyPlaceholder(expected: string) {
    await expect(this.messageInput).toHaveAttribute("placeholder", expected);
  }

  async getPlaceholder(): Promise<string | null> {
    return await this.messageInput.getAttribute("placeholder");
  }
}
