const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

    /**
     * define selectors using getter methods
     */

    // top buttons
    get buttonPower () { return $('#buttonPower') }
    get buttonTimer () { return $('#buttonNl') }
    get buttonSync () { return $('#buttonSync') }
    get buttonPeek () { return $('#buttonSr') }
    get buttonInfo () { return $('#buttonI') }
    get buttonConfig () { return $('.btnwrap > button:nth-child(6)') }
    get buttonPCMode() { return $('#buttonPcm') }

    // top bottom
    get btnColors () { return $('#bot').$('button') }
    get btnEffects () { return $('#bot').$('button') }
    get btnSegments () { return $('#bot').$('button') }
    get btnFavorites () { return $('#bot').$('button') }

    get activeTabLink() { return $('#bot').$('.active') }

 
    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
