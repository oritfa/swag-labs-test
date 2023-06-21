var assert = require('assert');
const { error } = require('console');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;


describe('Elementor tests', function () {

    var driver;
    beforeEach(async function () {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        driver.get('https://www.saucedemo.com/')
    })

    afterEach(function () {
        driver.quit()
    })

    // TEST 1: Valid Login

    it('TEST 1: Valid Login', async function () {

        this.timeout(50000)
        try {
            await driver.findElement(By.name('user-name')).sendKeys('standard_user')
            await driver.findElement(By.name('password')).sendKeys('secret_sauce')
            await driver.findElement(By.id('login-button')).click()
            await driver.findElement(By.id('contents_wrapper'))
        }
        catch (error) {
            console.log(error)
        }

    })

    // TEST 2: Invalid Login

    it('TEST 2: Invalid Login', async function () {

        this.timeout(50000)
        try {
            await driver.findElement(By.name('user-name')).sendKeys('standard_user')
            await driver.findElement(By.name('password')).sendKeys('1234')
            await driver.findElement(By.id('login-button')).click()
            await driver.findElement(By.xpath('//button[@class="error-button"]'))
        }
        catch (error) {
            console.log(error)
        }

    })


    //TEST 3: Add and remove item

    it('TEST 3: Add and remove item', async function () {

        this.timeout(50000)
        try {
            var expectedNumsOfItems = '1'

            await driver.findElement(By.name('user-name')).sendKeys('standard_user')
            await driver.findElement(By.name('password')).sendKeys('secret_sauce')
            await driver.findElement(By.id('login-button')).click()

            //Add item to cart
            await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click()
            await driver.findElement(By.id('remove-sauce-labs-backpack'))
            var cartItems = await driver.findElement(By.xpath('//span[@class="shopping_cart_badge"]'))
            await cartItems.getText('value')
                .then(function (numsOfItems) {
                    assert.ok(numsOfItems == expectedNumsOfItems, `Expected: '${expectedNumsOfItems}, Actual: '${numsOfItems}'`)
                })
                .catch((error) => {
                    console.log(error)
                })

            //remove item from cart
            await driver.findElement(By.id('remove-sauce-labs-backpack')).click()
            await driver.findElement(By.id('add-to-cart-sauce-labs-backpack'))

        }
        catch (error) {
            console.log(error)
        }

    })

    //TEST 4: Sort - I haven't finished yet

    // it('TEST 4: Sort', async function () {

    //     this.timeout(50000)
    //     try {
    //         await driver.findElement(By.name('user-name')).sendKeys('standard_user')
    //         await driver.findElement(By.name('password')).sendKeys('secret_sauce')
    //         await driver.findElement(By.id('login-button')).click()

    //         var elements = await driver.findElement(By.css('.inventory_list > *'))
    //         for(let e of elements) {
    //             console.log(await e.getText());
    //         }

    //     }
    //     catch (error) {
    //         console.log(error)
    //     }

    // })


    //TEST 5: Checkout

    it('TEST 5: Checkout', async function () {

        this.timeout(50000)
        try {
            await driver.findElement(By.name('user-name')).sendKeys('standard_user')
            await driver.findElement(By.name('password')).sendKeys('secret_sauce')
            await driver.findElement(By.id('login-button')).click()

            //Add iten to cart
            await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click()
            await driver.findElement(By.xpath('//a[@class="shopping_cart_link"]')).click()

            await driver.findElement(By.id('checkout')).click()
            await driver.findElement(By.id('first-name')).sendKeys('firstname')
            await driver.findElement(By.id('last-name')).sendKeys('lastname')
            await driver.findElement(By.id('postal-code')).sendKeys('22367')
            await driver.findElement(By.id('continue')).click()
            await driver.findElement(By.id('finish')).click()
            await driver.findElement(By.xpath('//h2[@class="complete-header"]'))

        }
        catch (error) {
            console.log(error)
        }
    })
})