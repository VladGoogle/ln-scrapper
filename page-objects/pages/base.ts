import { type Locator, type Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('link', { name: 'Sign in', exact: true })
    }
}