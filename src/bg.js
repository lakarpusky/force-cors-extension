const RULE_ID = 1;

const CORS_RULE = {
  id: RULE_ID,
  priority: 1,
  action: {
    type: "modifyHeaders",
    responseHeaders: [
      { header: "access-control-allow-origin", operation: "remove" },
      { header: "access-control-allow-credentials", operation: "remove" },
      { header: "access-control-allow-methods", operation: "remove" },
      { header: "access-control-allow-headers", operation: "remove" },
      { header: "access-control-expose-headers", operation: "remove" }
    ]
  },
  condition: {
    resourceTypes: ["xmlhttprequest"]
    // 'fetch' is covered by 'xmlhttprequest' in Chrome
  }
};

// Enable on install
chrome.runtime.onInstalled.addListener(async () => {
  await enableCorsBlock();
  await chrome.storage.sync.set({ enabled: true });
});

// Load state on startup
chrome.runtime.onStartup.addListener(async () => {
  const { enabled } = await chrome.storage.sync.get("enabled");
  if (enabled) await enableCorsBlock();
});

async function enableCorsBlock() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
    addRules: [CORS_RULE]
  });
}

async function disableCorsBlock() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID]
  });
}

// Listen for toggle from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "toggle") {
    if (msg.enabled) {
      enableCorsBlock().then(() => sendResponse({ status: "enabled" }));
    } else {
      disableCorsBlock().then(() => sendResponse({ status: "disabled" }));
    }
    return true; // async response
  }
});
