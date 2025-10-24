import {test,expect} from "@playwright/test";
import { formdemo } from '../Pages/formdemo.spec';
import { connectToBrowser } from "..//Utilities/setup.spec";
import { teardown } from "../Utilities/teardown.spec";
import {capabilities} from "../Config/capabilities";
interface Capability { browserName: string; [key: string]: any; }


 test("submit the form and check the assertion", async ({ browserName }: { browserName: string }) => {
    
      // typed find callback
    
    
      const capability = capabilities.find((cap: Capability) => cap.browserName === browserName);
    
      const browser = await connectToBrowser(capability);
      const page = await browser.newPage();
 
    
    
      // Navigate using relative path; baseURL is automatically applied
     const form = new formdemo(page);
await page.goto(`/selenium-playground/input-form-demo`);
await form.firstname('Satish');
await form.email('sat@yahoo.com');
await form.password('satu');
await form.company('Spotlight');
await form.website("www.google.com");
await form.country('US')
await form.city ("Atlanta");
await form.address1 ('908 Okemos Road');
await form.address2 ('Stephenson Road');
await form.state ('MI');
await form.zipcode('48084');
await form.submit();
await expect(page.getByText('Thanks for contacting us, we will get back to you shortly.')).toBeVisible();
await browser.close();

});

test ("Submit without entering anything", async ({ browserName }: { browserName: string }) => {


        const capability = capabilities.find((cap: Capability) => cap.browserName === browserName);
    
      const browser = await connectToBrowser(capability);
      const page = await browser.newPage();
 
    
    
      // Navigate using relative path; baseURL is automatically applied
        const form = new formdemo(page);
await page.goto(`/selenium-playground/input-form-demo`);
await form.submit();
const nameInput= await page.getByRole('textbox', { name: 'Name' })
const isMissing = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
expect(isMissing).toBeTruthy();
await browser.close();
    });

