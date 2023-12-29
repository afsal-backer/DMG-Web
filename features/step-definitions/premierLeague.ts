import { Given, When, Then } from '@wdio/cucumber-framework';
import sportsTablePage from '../pageobjects/sportsTable.page';


Given('I navigate to Daily Mail Sports Website and accept cookies', async () => {
    await sportsTablePage.open();
    await sportsTablePage.acceptCookies(); 
});

When('I click on Sport menu and open the Premier League table', async () => {
    await sportsTablePage.openSportMenu();
    await sportsTablePage.assertCurrentUrl('sport')
    await sportsTablePage.openPreimerLeagueTab();
    await sportsTablePage.assertCurrentUrl('premierleague')
});

When('I click on the View Tables tab', async () => {
    await sportsTablePage.openTablesTab();
    await sportsTablePage.assertCurrentUrl('tables')
});

Then('Position and points of a given team is shown', {}, async datatable => { 
    const teamName = datatable.hashes();  
    await sportsTablePage.getTeamPositionPoints(teamName);
});


