const toggleBtn = document.getElementById('toggle');
const statusEl = document.getElementById('status');

async function updateUI() {
  const { enabled } = await chrome.storage.sync.get("enabled");
  statusEl.textContent = enabled ? "CORS BLOCK: ON" : "CORS BLOCK: OFF";
  toggleBtn.textContent = enabled ? "Disable CORS Block" : "Enable CORS Block";
}

toggleBtn.onclick = async () => {
  const { enabled } = await chrome.storage.sync.get("enabled");
  const newState = !enabled;

  chrome.runtime.sendMessage(
    { action: "toggle", enabled: newState },
    (response) => {
      chrome.storage.sync.set({ enabled: newState });
      updateUI();
    }
  );
};

// Init
updateUI();
