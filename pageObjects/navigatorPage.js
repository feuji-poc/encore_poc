const Page=require("./page");
require('dotenv').config();
const{expect}=require('@playwright/test')
const data=require('../data/navigator.json')
const path = require('path');
const fs=require('node:fs/promises')
class NavigatorPage extends Page {
    constructor(page) {
        super();
        if (!page) {
            throw new Error("Page object is undefined");  // Add a check to ensure page is not undefined
        }
        this.page = page; 
    }
    get createOrderBtn(){
        return global.page.locator("//button[@class='btn btn-success']")
    }
    get clickOnjobsBtn(){
        return global.page.locator("//a[text()=' Jobs ']")
    }
    get selectRoomType(){
        return global.page.locator("(//div[@class='slick-cell l7 r7 true'])[1]")
    }

    get clickOnRoomDropDown(){
        return global.page.locator("select.editor-combobox")
    }
    get selectFirstRoom(){
        return global.page.locator("(//div[@class='slick-cell l7 r7 true'])[1]")
    }
    get firstRoomDropDown(){
        return global.page.locator("select.editor-combobox")
    }
    get saveBtn(){
        return global.page.locator("//button[@class='btn btn-success ms-3 ng-star-inserted']")
    }
    get changeStatus(){
        return global.page.locator("//div[@class='slick-cell l6 r6 true selected']")
    }
    get statusDropDown(){
        return global.page.locator('//select[@class="orderInput h-auto ng-untouched ng-pristine ng-valid"]')
    }
    get itemsBtn(){
        return global.page.locator("//a[text()=' Items ']")
    }
    get clickPackageIcon(){
        return global.page.locator("//span[@class='glyphicon glyphicon-gift']")
    }
    get selectPackageName(){
        return global.page.locator("//div[@id='slickGridContainer-oePackagesGrid']//div[@class='grid-canvas grid-canvas-top grid-canvas-left']//div[contains(@class,'ui-widget-content slick-row ')][2]")
    }
    navigator() {
        return super.navigator("#!/orderNew/1137/%7B9A9A1837-A153-4E91-8C36-95FB1539E9C3%7D");
    }
    async createOrder(){
        await this.createOrderBtn.click();
        console.log("+++++++++++++++++++++++++++++++++++++++++")
        const currentUrl = this.page.url();
        console.log(`Order Page URL is: ${currentUrl}`);
    }
    async jobsPage(){
        await this.clickOnjobsBtn.click();
        const currentUrl = this.page.url();
        console.log(`Jobs Page URL is: ${currentUrl}`);
        // const divElement = await this.page.locator('//div[@class="slick-cell l7 r7 selected true" and text()="Bobcock A"]');
    // await divElement.click();
    // await this.selectRoom.click();
    console.log("-------------------jobs page end---------------------")
    }
    async selectRooms(){
        await this.selectRoomType.click();
        await this.clickOnRoomDropDown.click();
        await this.clickOnRoomDropDown.selectOption({ label: 'Babcock A' });

        // await this.saveBtn.click()
        console.log("-------------------------room type selected--------------")
        await this.selectFirstRoom.click()
        await this.firstRoomDropDown.selectOption({ label: 'Babcock A' });
console.log("------------------firstroom selected---------------")
        await this.changeStatus.click();
        await this.statusDropDown.selectOption({ label: 'Confirmed' });
        console.log("----------selected job status----------")
        // await this.saveBtn.click();
        await this.saveBtn.click()
        // console.log("-------------first room selected-------------")
        await global.page.waitForTimeout(5000);
        const firstJobNumberElement = await page.locator('span.job-number').nth(0);
        const firstJobNumber = await firstJobNumberElement.textContent();
        console.log('First Job Number:', firstJobNumber);
        data.first_job_no= firstJobNumber;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));


        const secondJobNumberElement = await page.locator('span.job-number').nth(1);
         const secondJobNumber = await secondJobNumberElement.textContent();
        console.log('Second Job Number:', secondJobNumber);

        data.second_job_no= secondJobNumber;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
       
        const orderElement = await page.locator('label.orderTickerDisplayValue').nth(1);
        const orderNumber = await orderElement.textContent();
        console.log('Order Number:', orderNumber);
        data.order_no= orderNumber;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
    }
    async changeJobStatus(){
        // await this.changeStatus.click();
    }
    async selectItems(){
        await global.page.waitForTimeout(5000)
        await this.itemsBtn.click();
        await this.clickPackageIcon.click();
        await this.selectPackageName.dblclick();
        console.log("-------selected particular item to see------")
        const element = await global.page.locator("(//div[@id='slickGridContainer-oeOrderLinesGrid']//div[@class='grid-canvas grid-canvas-top grid-canvas-left']//following::div)[3]");
      
        const textContent = await element.textContent()
        console.log("Item Name:==================", textContent);
        data.item_name= textContent;
        fs.writeFile("./data/navigator.json",JSON.stringify(data));
    }
}
module.exports =NavigatorPage; 