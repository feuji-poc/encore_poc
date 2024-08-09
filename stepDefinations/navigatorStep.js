const { Given , When} = require('@cucumber/cucumber');
const { chromium } = require('playwright');
require('dotenv').config();
const LoginPage=require('../pageObjects/login.page')
const NavigatorPage = require('../pageObjects/navigatorPage')
const data=require("../data/navigator.json")
const fs = require('fs');

const pages = {
    login: LoginPage
}
const navigatorpages={
    
    searchorder: NavigatorPage
}
let navigatorPageInstance;
Given(/^I am on the login page$/, async () => {
    await global.page.goto('https://navigator.training.psav.com/')
    navigatorPageInstance = new NavigatorPage(global.page);  
});

When('I login with emailid and password', async() => {
    await LoginPage.login_navigator(process.env.email_id, process.env.password);
    const currentUrl = global.page.url();
    console.log(`Current page URL is: ${currentUrl}`);
});

When(`Create the new order`, async () => {
    await global.page.waitForTimeout(7000);
    await navigatorPageInstance.navigator();
    await global.page.waitForTimeout(8000);
    const currentUrl = global.page.url();
    console.log("navigated to navigator page")
    console.log(`Navigator page URL is: ${currentUrl}`);
    global.page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`Console error: ${msg.text()}`);
        }
    });
    // console.log("============================")
    // await NavigatorPage.createOrder();
    await navigatorPageInstance.createOrder();
    await global.page.waitForTimeout(5000);
});

When(`Click on jobs`, async () => {
    await global.page.waitForTimeout(3000);
    await navigatorPageInstance.jobsPage();
    await global.page.waitForTimeout(1000);
    await navigatorPageInstance.selectRooms();
    await global.page.waitForTimeout(3000);
    // await navigatorPageInstance.changeJobStatus();
});


When(`Select the Items in the page`, async() => {
    await global.page.waitForTimeout(3000);
    await navigatorPageInstance.selectItems();
    await global.page.waitForTimeout(3000);

    
});