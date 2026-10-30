import { Redirect } from 'expo-router';

/** Landing route for the Google/Facebook sign-in redirect on phones; the session is handled in auth state. */
export default function AuthCallback() {
  return <Redirect href="/" />;
}
