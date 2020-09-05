/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`/${path}`)
    }

    get getWindowInnerWidth () { return browser.execute(() => { return window.innerWidth; }) }

    setWindowInnerWidth(width) {
        let innerWidth = browser.execute(() => { return window.innerWidth; });  

        let windowSize = browser.getWindowSize();
        // the difference between WindowSize.width and window.innerWidth is not constant
        let newWidth = windowSize.width + (width - innerWidth);
        browser.setWindowSize(newWidth, windowSize.height);

        innerWidth = browser.execute(() => { return window.innerWidth; });
        if (width != innerWidth)
        {
            newWidth += (width - innerWidth);
            browser.setWindowSize(newWidth, windowSize.height);
            innerWidth = browser.execute(() => { return window.innerWidth; });
        }

        console.log(`Target Width = ${width}, Current Width =  ${innerWidth}`);
    }
}
