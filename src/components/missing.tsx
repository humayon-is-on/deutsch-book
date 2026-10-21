import { router } from 'expo-router';

import { Button, Notice, Screen } from '@/components/ui';

export function Missing() {
  return (
    <Screen edges={[]}>
      <Notice tone="warning">এই বিষয়টি পাওয়া যায়নি। হয়তো এটি সরিয়ে ফেলা হয়েছে।</Notice>
      <Button title="ফিরে যান" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}
