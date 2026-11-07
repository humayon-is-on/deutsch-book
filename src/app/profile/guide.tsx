import { View } from 'react-native';

import { AppText, Card, Icon, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT, type Translate } from '@/i18n';

type GuidePart = { icon: string; title: string; points: string[] };

/** The app guide's parts, in the order a new learner meets them. */
const guideParts = (t: Translate): GuidePart[] => [
  {
    icon: 'book-outline',
    title: t('শিখুন ট্যাব', 'Learn tab'),
    points: [
      t('এখানে আপনার লেভেলের সব মডিউল আছে: ব্যাকরণ, শব্দভান্ডার, দৈনন্দিন বাক্য, মডেল, ইমেইল ও চিঠি, কথোপকথন।', 'Here are all modules of your level: Grammar, Vocabulary, Everyday phrases, Models, Emails & Letters, Dialogues.'),
      t('উপরের কার্ডটি আপনাকে পরের টপিকে নিয়ে যায়।', 'The card at the top takes you to your next topic.'),
      t('প্রতিটি মডিউলের টপিক একটার পর একটা খোলে। টপিকের শেষের পরীক্ষায় 60% পেলে পরের টপিক খুলবে।', 'Topics in each module open one after another. Score 60% in the test at the end of a topic to open the next one.'),
    ],
  },
  {
    icon: 'volume-high-outline',
    title: t('শুনুন ও অনুবাদ দেখুন', 'Listen and see the translation'),
    points: [
      t('স্পিকার আইকনে চাপ দিলে জার্মান উচ্চারণ শুনবেন।', 'Tap the speaker icon to hear the German pronunciation.'),
      t('উপরে ডানদিকের “বাংলা” বোতাম পুরো বাংলা অনুবাদ দেখায় বা লুকায়।', 'The “বাংলা” button at the top right shows or hides the full Bangla translation.'),
    ],
  },
  {
    icon: 'bookmark-outline',
    title: t('শব্দ সেভ করুন', 'Save words'),
    points: [
      t('কঠিন শব্দের পাশে বুকমার্ক আইকনে চাপ দিয়ে সেভ করুন।', 'Tap the bookmark icon next to a hard word to save it.'),
      t('সেভ করা শব্দ প্রোফাইল ও অনুশীলন ট্যাবে পাবেন, সেখান থেকে আবার অনুশীলন করতে পারবেন।', 'You find saved words in the Profile and Practice tabs, and can practise them again from there.'),
    ],
  },
  {
    icon: 'barbell-outline',
    title: t('অনুশীলন ট্যাব', 'Practice tab'),
    points: [
      t('প্র্যাকটিস কার্ডগুলো ক্রমে খোলে। একটি শেষ করলে পরেরটি খুলবে।', 'Practice cards open in order. Finish one to open the next.'),
      t('প্রতিটি কার্ডে লেখা থাকে কোন ব্যাকরণ ও শব্দকোষ পর্যন্ত শিখে তারপর অনুশীলন করবেন।', 'Each card says up to which grammar and vocabulary topic to learn before practising it.'),
    ],
  },
  {
    icon: 'heart-outline',
    title: t('হার্ট', 'Hearts'),
    points: [
      t('প্র্যাকটিসে আপনার 5টি হার্ট আছে। প্রতিটি ভুল উত্তরে 1টি হার্ট কমে।', 'You have 5 hearts in practice. Each wrong answer costs 1 heart.'),
      t('প্রতি 2 ঘণ্টায় 1টি হার্ট নিজে থেকে ফিরে আসে। হার্ট শেষ হলে বিজ্ঞাপন দেখে 1টি হার্ট নিতে পারেন।', 'One heart comes back on its own every 2 hours. When you run out, you can watch an ad for 1 heart.'),
    ],
  },
  {
    icon: 'trending-up-outline',
    title: t('পরের লেভেলে যান', 'Move to the next level'),
    points: [
      t('শিখুন ট্যাবের সব টপিক শেষ হলে পরের লেভেলের বোতাম আসবে।', 'When all topics in the Learn tab are done, the next-level button appears.'),
      t('A1 ও A2-তে অনুশীলন ট্যাবের শেষে লেভেল পরীক্ষায় পাস করেও পরের লেভেলে যেতে পারেন।', 'In A1 and A2 you can also move up by passing the level test at the end of the Practice tab.'),
    ],
  },
  {
    icon: 'person-circle-outline',
    title: t('অ্যাকাউন্ট', 'Account'),
    points: [
      t('অ্যাকাউন্ট ছাড়া অ্যাপ বন্ধ করলে অগ্রগতি মুছে যায়। অ্যাকাউন্ট খুললে অগ্রগতি সংরক্ষিত থাকে।', 'Without an account, your progress is deleted when you close the app. With an account, it stays saved.'),
      t('প্রোফাইল > সেটিংসে অ্যাপের ভাষা ও ইংরেজি অনুবাদ বদলাতে পারবেন।', 'In Profile > Settings you can change the app language and English translation.'),
    ],
  },
];

/** A short in-app guide to how Deutsch Book works, opened from Profile > Info. */
export default function GuideScreen() {
  const { colors } = useTheme();
  const t = useT();
  return (
    <Screen edges={['bottom']}>
      <AppText variant="bn" muted>
        {t('Deutsch Book কীভাবে ব্যবহার করবেন, সংক্ষেপে।', 'How to use Deutsch Book, in short.')}
      </AppText>
      {guideParts(t).map((part) => (
        <Card key={part.icon}>
          <Row style={{ gap: Spacing.sm }}>
            <Icon name={part.icon} color={colors.primary} />
            <AppText variant="subheading" style={{ flex: 1 }}>
              {part.title}
            </AppText>
          </Row>
          {part.points.map((point) => (
            <View key={point} style={{ flexDirection: 'row', gap: Spacing.sm }}>
              <AppText variant="bn" muted>
                •
              </AppText>
              <AppText variant="bn" style={{ flex: 1 }}>
                {point}
              </AppText>
            </View>
          ))}
        </Card>
      ))}
    </Screen>
  );
}
