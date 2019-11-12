const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  headless: false,
  args: [
      // '--auto-open-devtools-for-tabs',
      // '--disable-dev-shm-usage'
  ]
});