class DCVinspector {
    constructor(page) {
        this.page = page;
        this.startButton = page.locator('button:has-text("Start New Test")');
        this.domain = page.locator('code.test_domain');
    }

    async open() {
        await this.page.goto(
            'https://dcv-inspector.com/test/f4fbdc5f868519ac3ed5fd56b5e3b149'
        );
    }           

    async startTest() {
        await this.startButton.click();
    }

    async getDomain() {
        await this.domain.waitFor({ state: 'visible' });
        let text = await this.domain.textContent();
        return text?.trim();
    }
}

module.exports = { DCVinspector };