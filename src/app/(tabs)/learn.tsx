import { Redirect } from 'expo-router';

/** Learn moved to the first tab; old links to /learn land there. */
export default function LearnRedirect() {
  return <Redirect href="/" />;
}
