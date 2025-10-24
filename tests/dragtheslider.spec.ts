import {  test,expect} from '@playwright/test';
import draganddrop  from "..//Pages/draganddrop.spec.ts";
import { connectToBrowser } from "..//Utilities/setup.spec";
import { teardown } from "../Utilities/teardown.spec";
import {capabilities} from "../Config/capabilities";

interface Capability { browserName: string; [key: string]: any; }

test("Slide Value from 15 to 95", async ({ browserName }: { browserName: string }) => {

  // typed find callback


  const capability = capabilities.find((cap: Capability) => cap.browserName === browserName);

  const browser = await connectToBrowser(capability);
  const page = await browser.newPage();


  // Navigate using relative path; baseURL is automatically applied


  const sliderPage: draganddrop = new draganddrop (page);

  await sliderPage.navigate();
  await sliderPage.openSliderPage();
  await sliderPage.setSliderValue('15');
  await sliderPage.setSliderValue('95');
 await sliderPage.verifySliderValue('95');
  await browser.close();


});