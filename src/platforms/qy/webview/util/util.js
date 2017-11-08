export const isApp = typeof window.__bridge__ !== 'undefined';
export const isBrowser = !isApp;
export const isIosApp = isApp && typeof window.webkit !== 'undefined';
export const isAndroidApp = isApp && !isIos;
