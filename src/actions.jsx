// actions.js
export const saveScreenshot = (screenshot) => ({
  type: 'SAVE_SCREENSHOT',
  payload: screenshot,
});

export const loadScreenshots = (screenshots) => ({
  type: 'LOAD_SCREENSHOTS',
  payload: screenshots,
});
