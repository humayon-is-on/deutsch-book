import { Profile } from './(tabs)/profile';

/** Profile without the tab bar, for signed-in learners who haven't picked a level yet. */
export default function AccountScreen() {
  return <Profile standalone />;
}
