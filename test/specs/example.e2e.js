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

    it('1st quick color select should have red background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(0).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#ff0000');
    });

    it('2nd quick color select should have dark orange background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(1).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#ffa000');
    });
    
    it('3rd quick color select should have gold background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(2).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#ffc800');
    });

    it('4th quick color select should have yellow background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(3).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#ffe0a0');
    });

    it('5th quick color select should have white background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(4).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#ffffff');
    });

    it('6th quick color select should have black background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(5).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#000000');
    });

    it('7th quick color select should have Magenta background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(6).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#ff00ff');
    });

    it('8th quick color select should have blue background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(7).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#0000ff');
    });

    it('9th quick color select should have 00ffc8 background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(8).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#00ffc8');
    });

    it('10th quick color select should have 08ff00 background', () => {
        HomePage.open();

        const color = HomePage.quickColorSelect(9).getCSSProperty('background-color')
        expect(color.parsed.hex).toBe('#08ff00');
    });
});




