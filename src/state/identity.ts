import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';

/** Name shown for guests, who have no account yet. */
export const GUEST_NAME = 'অতিথি';

/**
 * The avatar and name shown for the learner. The name they typed wins;
 * otherwise the account's name (from Google) or the start of their email.
 */
export function useIdentity(): { avatar?: number; name: string; accountName: string } {
  const { session } = useAuth();
  const { progress, isGuest } = useProgress();
  if (isGuest || !session) return { name: GUEST_NAME, accountName: GUEST_NAME };
  const meta = session.user.user_metadata ?? {};
  const email = session.user.email ?? '';
  const accountName = String(meta.full_name || meta.name || email.split('@')[0] || GUEST_NAME);
  const chosen = progress.settings.displayName?.trim();
  return { avatar: progress.settings.avatar, name: chosen || accountName, accountName };
}
