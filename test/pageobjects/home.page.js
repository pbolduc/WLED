const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

    //const bottom = $('#bot');
    /**
     * define selectors using getter methods
     */
    get btnColors () { return $('#bot').$('button') }
    get btnEffects () { return $('#bot').$('button') }
    get btnSegments () { return $('#bot').$('button') }
    get btnFavorites () { return $('#bot').$('button') }

    get activeTabLink() { return $('#bot').$('.active') }

    get btnPCMode() { return $('#buttonPcm') }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
