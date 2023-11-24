export const useIsWebView = () => {
  // Check the user-agent string for WebView identifiers
  const userAgent: string =
    // @ts-expect-error opera not known
    navigator.userAgent || navigator.vendor || window.opera;

  if (/WebView|(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent)) {
    return true; // iOS WebView
  }

  if (/Android.* wv/.test(userAgent)) {
    return true; // Android WebView
  }

  return false;
};
