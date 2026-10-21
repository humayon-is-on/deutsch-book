import * as WebBrowser from 'expo-web-browser';

/** The public web site (GitHub Pages), which also hosts the policy pages Google Play links to. */
export const SITE_URL = 'https://humayon-is-on.github.io/deutsch-book/';

export function openPage(page: string) {
  return WebBrowser.openBrowserAsync(SITE_URL + page);
}
