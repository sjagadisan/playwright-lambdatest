// LambdaTest capabilities
 const capabilities = {
   'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
   'browserVersion': 'latest',
   'LT:Options': {
     'platform': 'Windows 10',
     'build': 'Playwright Build - Full suite',
     'name': 'Playwright Test',
     'user': process.env.LT_USERNAME,
     'accessKey': process.env.LT_ACCESS_KEY,
     'network': true,
     'video': true,
     'console': true,
     'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
     'tunnelName': '', // Optional
     'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
   }
 }
