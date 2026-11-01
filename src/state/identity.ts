import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/** Name shown for guests, who have no account yet. */
const GUEST_NAME = { bn: 'অতিথি', en: 'Guest' };

/**
 * The avatar and name shown for the learner. The name they typed wins;
 * otherwise the account's name (from Google) or the start of their email.
 */
export function useIdentity(): { avatar?: number; name: string; accountName: string } {
  const { session } = useAuth();
  const { progress, isGuest } = useProgress();
  const guestName = useT()(GUEST_NAME.bn, GUEST_NAME.en);
  if (isGuest || !session) return { name: guestName, accountName: guestName };
  const meta = session.user.user_metadata ?? {};
  const email = session.user.email ?? '';
  const accountName = String(meta.full_name || meta.name || email.split('@')[0] || guestName);
  const chosen = progress.settings.displayName?.trim();
  return { avatar: progress.settings.avatar, name: chosen || accountName, accountName };
}
