exports.config = {
  framework: 'jasmine',
  specs: ['tests/e2e/*.spec.js'],
  directConnect: true,
  jasmineNodeOpts:
  {
      isVerbose: false,
      showColors: true,
      includeStackTrace: true,
      defaultTimeoutInterval: 600000,
  },
  baseUrl: 'http:
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--disable-gpu", "--no-sandbox", "disable-infobars", "--window-size=1680,1050" ]
    }
  },
}
