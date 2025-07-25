# Browser Storage & Cookies Policy

This document details all browser storage mechanisms (cookies, localStorage, sessionStorage, cache) used by the Overlays Fashion E-commerce site, including any third-party or temporary data.

---

## 1. localStorage
- **Key:** `cart`
- **Purpose:** Stores the user's shopping cart items persistently in the browser.
- **Data Stored:** Array of product objects (id, name, img, price, size, quantity, etc.)
- **When:**
  - When a user adds/removes items from the cart.
  - When the cart is cleared (e.g., after checkout or by user action).
  - On page load, the cart is initialized from localStorage if present.
- **Example:**
  ```json
  [
    { "id": "123", "name": "Classic White Top", "price": 1299, "quantity": 1 }
  ]
  ```

## 2. sessionStorage
- **Not used.**
- No data is stored in sessionStorage by this site.

## 3. Cookies
- **Not used by application code.**
- No direct usage of `document.cookie` or any cookie library in the app code.
- No authentication, tracking, or preference cookies are set by the app itself.
- **Third-party cookies:**
  - As of this codebase, there are no third-party analytics, ads, or scripts that set cookies.
  - If you add analytics (Google Analytics, Facebook Pixel, etc.) or embed third-party widgets, those may set cookies. Check your browser's Application/Storage tab for any such cookies if you add third-party scripts.

## 4. Cache
- **No explicit cache.**
- No service workers, IndexedDB, or manual cache logic are present in the codebase.
- The browser may cache static assets (images, JS, CSS) as part of normal web behavior, but this is managed by the browser and server, not by custom code.

## 5. Temporary/Other Data
- **React state:**
  - Temporary UI state (e.g., modals, toasts, form inputs) is managed in memory and not persisted.
- **No other persistent or temporary storage is used.**

---

**Summary:**
- The only persistent data stored by this site is the shopping cart in `localStorage`.
- No cookies, sessionStorage, or custom cache are used by the app code.
- No third-party scripts set cookies as of this codebase.

_Last updated: 2024-06-09_ 