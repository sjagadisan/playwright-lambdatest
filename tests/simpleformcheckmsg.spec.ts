import { test, expect } from "@playwright/test";
import SimpleFormDemo  from "..//Pages/simpleformdemo.spec";
import { connectToBrowser } from "..//Utilities/setup.spec";
import { teardown } from "../Utilities/teardown.spec";
import {capabilities} from "../Config/capabilities";


interface Capability { browserName: string; [key: string]: any; }

test("Validate Simple Form Demo message", async ({ browserName }: { browserName: string }) => {

  // typed find callback


  const capability = capabilities.find((cap: Capability) => cap.browserName === browserName);

  const browser = await connectToBrowser(capability);
  const page = await browser.newPage();

  const simpleForm = new SimpleFormDemo(page);


  // Navigate using relative path; baseURL is automatically applied
  await simpleForm.navigate();

  //Assertion to verify URL

  await expect (page).toHaveURL(/simple-form-demo/)

  // Verify placeholder
  await simpleForm.verifyPlaceholder("Please enter your Message");

  // Enter message
  await simpleForm.enterMessage("Welcome to Lambda Test");

  // Click show message button
  await simpleForm.clickShowMessage();

  // Verify displayed message
  const displayed = page.locator("p#message");
  await expect(displayed).toHaveText("Welcome to Lambda Test", { timeout: 60000 });


    // ensure the remote session is closed so LambdaTest can mark it Passed/Failed
    await browser.close();

});

