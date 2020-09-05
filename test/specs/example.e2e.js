const HomePage = require('../pageobjects/home.page');

describe('WLED application', () => {
    const WindowSizeToWindowInnerWidth = 20;
    it('PC Mode should be visibile if wide browser', () => {

        browser.setWindowSize(1250 + WindowSizeToWindowInnerWidth, 945);
        HomePage.open();
        // ensure the browser window's innerWidth is greater or equal to the 
        expect(browser.execute(() => { return window.innerWidth; })).toBeGreaterThanOrEqual(1250);

        expect(HomePage.btnPCMode).toBeDisplayedInViewport();
    });

    it('PC Mode should not be visibile if narrow browser', () => {

        browser.setWindowSize(1250 - WindowSizeToWindowInnerWidth, 945);
        HomePage.open();
        expect(browser.execute(() => { return window.innerWidth; })).toBeLessThan(1250);

        expect(HomePage.btnPCMode).not.toBeDisplayedInViewport();
    });

    it('should have the right title', () => {
        HomePage.open();
        expect(browser).toHaveTitle('WLED');
    });
});




