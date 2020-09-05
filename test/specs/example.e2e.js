const HomePage = require('../pageobjects/home.page');

describe('WLED application', () => {
    const WindowSizeToWindowInnerWidth = 20;
    it('PC Mode button should be visibile if wide browser', () => {

        browser.setWindowSize(1250 + WindowSizeToWindowInnerWidth, 945);
        HomePage.open();
        // ensure the browser window's innerWidth is greater or equal to the 
        expect(browser.execute(() => { return window.innerWidth; })).toBeGreaterThanOrEqual(1250);

        expect(HomePage.buttonPCMode).toBeDisplayedInViewport();
    });

    it('PC Mode button should not be visibile if narrow browser', () => {

        browser.setWindowSize(1250 - WindowSizeToWindowInnerWidth, 945);
        HomePage.open();
        expect(browser.execute(() => { return window.innerWidth; })).toBeLessThan(1250);

        expect(HomePage.buttonPCMode).not.toBeDisplayedInViewport();
    });

    it('Power button should be visibile', () => {
        HomePage.open();
        expect(HomePage.buttonPower).toBeDisplayedInViewport();
    });

    it('Timer button should be visibile', () => {
        HomePage.open();
        expect(HomePage.buttonTimer).toBeDisplayedInViewport();
    });

    it('Sync button should be visibile', () => {
        HomePage.open();
        expect(HomePage.buttonSync).toBeDisplayedInViewport();
    });

    it('Peek button should be visibile', () => {
        HomePage.open();
        expect(HomePage.buttonPeek).toBeDisplayedInViewport();
    });

    
    it('Info button should be visibile', () => {
        HomePage.open();
        expect(HomePage.buttonInfo).toBeDisplayedInViewport();
    });
        
    it('Config button should be visibile', () => {
        HomePage.open();
        expect(HomePage.buttonConfig).toBeDisplayedInViewport();
    });

    it('should have the right title', () => {
        HomePage.open();
        expect(browser).toHaveTitle('WLED');
    });
});




