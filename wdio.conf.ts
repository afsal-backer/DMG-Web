import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {

    //browserstack set up
    
    // user: process.env.BROWSERSTACK_USERNAME,
    // key: process.env.BROWSERSTACK_ACCESS_KEY,
    // hostname: 'hub.browserstack.com',
    // services: ['browserstack'],

    runner: 'local',
   
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    
    //
    specs: [
        './features/**/*.feature'
    ],


    bail: 0,
    maxInstances: 1,
    maxInstancesPerCapability: 1,
    logLevel: 'info',

    capabilities: [{
        browserName: 'chrome',acceptInsecureCerts: false,
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--start-maximized',
                '--disable-gpu',
            ]
        }
    }],


    baseUrl: 'https://www.dailymail.co.uk/',

    waitforTimeout: 10000,
    waitforInterval: 500,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'cucumber',
    
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
}
