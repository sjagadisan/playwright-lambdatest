import { Page } from '@playwright/test';
export  class  formdemo {

constructor (private page:Page)
{
}

async firstname (firstname:string )
{
  await   this.page.getByRole('textbox', { name: 'Name' }).fill(firstname)
}
async email  (email:string )
{
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email)
}
async password  (password:string )
{
   await  this.page.getByRole('textbox', { name: 'Password*' }).fill(password)
}

async company  (company:string )
{
   await  this.page.getByRole('textbox', { name: 'Company' }).fill(company)
}

async website  (website:string )
{
 await  this.page.getByRole('textbox', { name: 'Website' }).fill(website)
}
async country  (country:string )
{
   await  this.page.getByRole('combobox').selectOption({ value: country });
}
async city   (city:string )
{
  await   this.page.getByRole('textbox', { name: 'City', exact: true }).fill(city)
}
async address1   (address1:string )
{
  await   this.page.getByRole('textbox', { name: 'Address 1' }).fill(address1)
}


async address2   (address2:string )
{
   await  this.page.getByRole('textbox', { name: 'Address 2' }).fill(address2)
}

async state   (state:string )
{
   await  this.page.getByRole('textbox', { name: 'City* State*' }).fill(state)
}

async zipcode   (zipcode:string )
{
 await    this.page.getByRole('textbox', { name: 'Zip Code*' }).fill(zipcode);
}

async submit   ()
{
 await this.page.locator("(//button[@type='submit'])[2]").click();
}

}
