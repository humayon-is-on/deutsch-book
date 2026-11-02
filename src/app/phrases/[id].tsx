import { useLocalSearchParams } from 'expo-router';

import { WithTopic } from '@/components/topic';
import { Words } from '@/app/vocab/[id]';

/** An everyday-phrases topic: shown like a word topic, with the English meaning always on. */
export default function PhrasesTopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <WithTopic id={id} modules={['phrases']}>
      {(file) => <Words topic={file.item} module="phrases" />}
    </WithTopic>
  );
}
