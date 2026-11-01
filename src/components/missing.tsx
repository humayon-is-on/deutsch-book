import { router } from 'expo-router';

import { Button, Notice, Screen } from '@/components/ui';
import { useT } from '@/i18n';

export function Missing() {
  const t = useT();
  return (
    <Screen edges={[]}>
      <Notice tone="warning">{t('এই বিষয়টি পাওয়া যায়নি। হয়তো এটি সরিয়ে ফেলা হয়েছে।', 'This item was not found. It may have been removed.')}</Notice>
      <Button title={t('ফিরে যান', 'Go back')} variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}
