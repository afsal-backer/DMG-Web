import { $, browser } from '@wdio/globals'
import Page from './page';
import { click } from '../utils/utils';

// Selectors

const sportMenuSelector = '(//a[text()="Sport"])[1]';
const preimerLeagueTabSelector = '//a[contains(@href,"premierleague")]';
const tablesTabSelector = '//a[contains(@href,"tables")]';

export class SportsPage extends Page {

    // Actions

    public async openSportMenu() {
        const sportTab = await $(sportMenuSelector);
        await click(sportTab); 
    }

    public async openPreimerLeagueTab() {
        const preimerLeagueTab = await $(preimerLeagueTabSelector);
        await click(preimerLeagueTab); 
    }

    public async openTablesTab() {
        await browser.execute('window.scrollTo(0, 250)');
        const tablesTab = await $(tablesTabSelector);
        await click(tablesTab); 
    }

    async getTeamPositionPoints(teamName: any[]) {
        let teamPositionPointsTeam: Array<string> = [];     
        for (let i = 0; i < teamName.length; i++) {
            const positionSelector = `//td[text()='${teamName[i].team}']/ancestor::tr/td[contains(@class,'pos_')]`;
            const pointsSelector = await $(`//td[text()='${teamName[i].team}']/ancestor::tr/td[contains(@class,'score-pts')]`
        );
         const positon = await $(positionSelector);
         const teamPositon = await positon.getText();
 
         const points = await $(pointsSelector);
         const teamPoints = await points.getText();
 
         teamPositionPointsTeam.push(teamPositon)
         teamPositionPointsTeam.push(teamPoints)
         
         console.log("Positon and Points for team: " +`${teamName[i].team}` +" is : "+teamPositionPointsTeam);
         teamPositionPointsTeam.length = 0;
        }
     }

    public open() {
        return browser.url('/');
    }


    // Asserts 

    public async assertCurrentUrl(expectedUrl: string) {
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes(expectedUrl)) {
            throw new Error(`The current URL is not as expected. Expected: ${expectedUrl}, Found: ${currentUrl}`);
        }
    }
    
}

export default new SportsPage();
