import Ionicons from '@expo/vector-icons/Ionicons';
import type { Session } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';

import { CodeInput, ResendButton } from '@/components/code-input';
import { AppText, Button, Notice } from '@/components/ui';
import { useAuth } from '@/state/auth';

/** Facebook's brand blue, for its "f" logo. */
const FACEBOOK_BLUE = '#0866FF';

/** How a signed-in learner proves it is them: a code to their email, or Facebook again. */
export type IdentityProof = { kind: 'email'; email: string } | { kind: 'facebook' };

/**
 * Facebook accounts may have no email, so they confirm with Facebook; everyone
 * else gets an emailed code. Null when there is no way to check (no session).
 */
export function identityProof(session: Session | null): IdentityProof | null {
  if (!session) return null;
  if (session.user.app_metadata.provider === 'facebook') return { kind: 'facebook' };
  return session.user.email ? { kind: 'email', email: session.user.email } : null;
}

/**
 * The proof step inside a popup (level change, delete account). `reason`
 * ends the sentence that says why, e.g. 'লেভেল বদলাতে'. Runs `onConfirmed`
 * once the code or Facebook check succeeds.
 */
export function IdentityCheck({
  proof,
  reason,
  onConfirmed,
}: {
  proof: IdentityProof;
  reason: string;
  onConfirmed: () => void;
}) {
  const { sendVerifyCode, verifyCode, confirmWithProvider } = useAuth();
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const send = async () => {
    setSendError(null);
    setError(null);
    setCode('');
    const err = await sendVerifyCode();
    if (err) return setSendError(err);
    setSentAt(Date.now());
  };
  // The first code goes out as the popup opens.
  const sent = useRef(false);
  useEffect(() => {
    if (proof.kind !== 'email' || sent.current) return;
    sent.current = true;
    send();
  });

  const run = async (check: () => Promise<string | null>) => {
    setChecking(true);
    setError(null);
    const err = await check();
    setChecking(false);
    if (err) return setError(err);
    onConfirmed();
  };

  if (proof.kind === 'facebook') {
    return (
      <>
        <AppText variant="bn" style={{ textAlign: 'center' }}>
          {reason} আবার Facebook দিয়ে নিশ্চিত করুন।
        </AppText>
        {error && <Notice tone="warning">{error}</Notice>}
        <Button
          title={checking ? 'নিশ্চিত করা হচ্ছে…' : 'Facebook দিয়ে নিশ্চিত করুন'}
          leading={<Ionicons name="logo-facebook" size={22} color={FACEBOOK_BLUE} />}
          variant="secondary"
          disabled={checking}
          onPress={() => run(() => confirmWithProvider('facebook'))} />
      </>
    );
  }

  return (
    <>
      <AppText variant="bn" style={{ textAlign: 'center' }}>
        আমরা {proof.email} ঠিকানায় একটি ৬ সংখ্যার কোড পাঠিয়েছি। {reason} কোডটি এখানে লিখুন।
      </AppText>
      {sendError && <Notice tone="warning">{sendError}</Notice>}
      <CodeInput value={code} onChange={setCode} onComplete={(c) => run(() => verifyCode(c))} error={error} disabled={checking} />
      {checking && (
        <AppText variant="caption" muted style={{ textAlign: 'center' }}>
          কোড যাচাই হচ্ছে…
        </AppText>
      )}
      <ResendButton sentAt={sentAt} onResend={send} />
    </>
  );
}
