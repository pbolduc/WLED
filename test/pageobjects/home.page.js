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

    quickColorSelect(n) { return $$('.qcs')[n] };

    cslButton(n) { return $('#csl').$$('button')[n]};

    // top bottom 
    get buttonColors () { return $('button.tablinks:nth-child(1)') }
    get buttonEffects () { return $('button.tablinks:nth-child(2)') }
    get buttonSegments () { return $('button.tablinks:nth-child(3)') }
    get buttonFavorites () { return $('button.tablinks:nth-child(4)') }

    get activeTabLink() { return $('#bot').$('.active') }

    clickColorsTab() {
        buttonColors.click();
    }

    clickEffectsTab() {
        buttonColors.click();
    }

    clickSegmentsTab() {
        buttonColors.click();
    }

    clickFavoritesTab() {
        buttonColors.click();
    }
 
    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
