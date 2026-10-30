import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Modal, View } from 'react-native';

import { CodeInput, ResendButton } from '@/components/code-input';
import { AppText, Button, Card, Icon, Notice } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { levelChange, type LevelChangeRequest } from '@/lib/level';
import { useLevelIndex } from '@/services/content/store';
import { useAuth } from '@/state/auth';
import { levelProgress, useProgress } from '@/state/progress';

/** Shows the level-change popup whenever `confirmLevelChange` asks. */
export function LevelChangeHost() {
  const request = useSyncExternalStore(levelChange.subscribe, levelChange.current, levelChange.current);
  const { progress } = useProgress();
  const { session } = useAuth();
  const index = useLevelIndex();
  if (!request) return null;
  const complete = levelProgress(progress, index).complete;
  const email = session?.user.email;
  // No progress to lose: a plain yes/no. Guests have no email, and a finished
  // level needs no proof: those get the warning only.
  const needsProof = request.hasProgress && !!session && !request.earned && !complete;
  // Facebook accounts may have no email, so they confirm with Facebook instead of a code.
  const facebook = session?.user.app_metadata.provider === 'facebook';
  return (
    <LevelChangePopup
      key={request.to}
      request={request}
      email={needsProof && !facebook && email ? email : null}
      confirmFacebook={needsProof && facebook} />
  );
}

/** Facebook's brand blue, for its "f" logo. */
const FACEBOOK_BLUE = '#0866FF';

function LevelChangePopup({
  request,
  email,
  confirmFacebook,
}: {
  request: LevelChangeRequest;
  email: string | null;
  confirmFacebook: boolean;
}) {
  const { colors } = useTheme();
  const { sendVerifyCode, verifyCode, confirmWithProvider } = useAuth();
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const send = async () => {
    setSendError(null);
    setCodeError(null);
    setCode('');
    const err = await sendVerifyCode();
    if (err) return setSendError(err);
    setSentAt(Date.now());
  };
  // The first code goes out as the popup opens.
  const sent = useRef(false);
  useEffect(() => {
    if (!email || sent.current) return;
    sent.current = true;
    send();
  });

  const check = async (value: string) => {
    setChecking(true);
    setCodeError(null);
    const err = await verifyCode(value);
    setChecking(false);
    if (err) return setCodeError(err);
    levelChange.answer(true);
  };

  const confirmWithFacebook = async () => {
    setChecking(true);
    setCodeError(null);
    const err = await confirmWithProvider('facebook');
    setChecking(false);
    if (err) return setCodeError(err);
    levelChange.answer(true);
  };

  const warning = `লেভেল বদলালে ${request.from ?? ''} লেভেলের সব অগ্রগতি মুছে যাবে এবং ${request.to} একদম শুরু থেকে শুরু হবে।`;

  return (
    <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.lg, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <Card style={{ alignItems: 'stretch', gap: Spacing.md, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Icon name="swap-vertical-outline" size={40} color={colors.primary} />
          </View>
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {request.to} লেভেলে যাবেন?
          </AppText>
          {request.hasProgress ? (
            <Notice tone="warning">{warning}</Notice>
          ) : (
            request.from && (
              <AppText variant="bn" muted style={{ textAlign: 'center' }}>
                আপনি এখন {request.from} লেভেলে আছেন।
              </AppText>
            )
          )}
          {email ? (
            <>
              <AppText variant="bn" style={{ textAlign: 'center' }}>
                আপনি এখনো এই লেভেল শেষ করেননি। আমরা {email} ঠিকানায় একটি ৬ সংখ্যার কোড পাঠিয়েছি। লেভেল বদলাতে কোডটি এখানে লিখুন।
              </AppText>
              {sendError && <Notice tone="warning">{sendError}</Notice>}
              <CodeInput value={code} onChange={setCode} onComplete={check} error={codeError} disabled={checking} />
              {checking && (
                <AppText variant="caption" muted style={{ textAlign: 'center' }}>
                  কোড যাচাই হচ্ছে…
                </AppText>
              )}
              <ResendButton sentAt={sentAt} onResend={send} />
            </>
          ) : confirmFacebook ? (
            <>
              <AppText variant="bn" style={{ textAlign: 'center' }}>
                আপনি এখনো এই লেভেল শেষ করেননি। লেভেল বদলাতে আবার Facebook দিয়ে নিশ্চিত করুন।
              </AppText>
              {codeError && <Notice tone="warning">{codeError}</Notice>}
              <Button
                title={checking ? 'নিশ্চিত করা হচ্ছে…' : 'Facebook দিয়ে নিশ্চিত করুন'}
                leading={<Ionicons name="logo-facebook" size={22} color={FACEBOOK_BLUE} />}
                variant="secondary"
                disabled={checking}
                onPress={confirmWithFacebook} />
            </>
          ) : (
            <Button
              title="লেভেল বদলান"
              icon="swap-vertical-outline"
              variant={request.hasProgress ? 'danger' : 'primary'}
              onPress={() => levelChange.answer(true)} />
          )}
          <Button title="বাতিল" variant="secondary" onPress={() => levelChange.answer(false)} />
        </Card>
      </View>
    </Modal>
  );
}
