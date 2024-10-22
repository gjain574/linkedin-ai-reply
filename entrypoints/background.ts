export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});

// Listen for on install event, and show a screenshot to the user
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    browser.tabs.create({
      url: '/welcome.html',
      active: true
    });
  }
}); 