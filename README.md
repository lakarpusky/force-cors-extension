# Force CORS Errors – Chrome Extension (Dev Only)

> **Strip all CORS headers to simulate real-world CORS failures**  
> Perfect for testing error handling in `fetch`, `XMLHttpRequest`, and APIs.
> 
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![Stars](https://img.shields.io/github/stars/lakarpusky/force-cors-extension?style=social)
---

## Features

- Removes **all** `Access-Control-*` headers from responses
- Works on **every** cross-origin request
- Toggle on/off via popup
- Auto-enables on install

---

## Installation (Developer Mode)

1. **Clone or download** this repo
2. Open Chrome → `chrome://extensions`
3. Enable **Developer mode**
4. Click **"Load unpacked"**
5. Select the `src/` folder

> Done!
