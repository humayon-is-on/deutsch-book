import * as WebBrowser from 'expo-web-browser';
import { Alert, Linking, Platform } from 'react-native';

import { tr } from '@/i18n';

/** The public web site (GitHub Pages), which also hosts the policy pages Google Play links to. */
export const SITE_URL = 'https://humayon-is-on.github.io/deutsch-book/';

export function openPage(page: string) {
  return WebBrowser.openBrowserAsync(SITE_URL + page);
}

/** Where learners' feedback goes. */
export const FEEDBACK_EMAIL = 'deutschbook.app@gmail.com';

/** Opens the phone's email app with a feedback email to us; shows the address if no email app opens. */
export async function sendFeedback() {
  const url = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent('Deutsch Book feedback')}`;
  try {
    await Linking.openURL(url);
  } catch {
    const text = tr(`আপনার মতামত এই ঠিকানায় ইমেইল করুন: ${FEEDBACK_EMAIL}`, `Please email your feedback to: ${FEEDBACK_EMAIL}`);
    if (Platform.OS === 'web') window.alert(text);
    else Alert.alert(tr('মতামত দিন', 'Send feedback'), text);
  }
}
