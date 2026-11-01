import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, View } from 'react-native';

import { IdentityCheck, identityProof } from '@/components/identity-check';
import { AppText, Button, Card, Icon, Notice, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { useT } from '@/i18n';

/**
 * Delete-account popup: the warning, then proof that it is the account's
 * owner (emailed code, or Facebook again). The account goes only after that.
 */
export function DeleteAccountPopup({ onClose }: { onClose: () => void }) {
  const { colors } = useTheme();
  const { session, deleteAccount } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Once proven, a failed delete is retried without asking again.
  const [confirmed, setConfirmed] = useState(false);
  const proof = identityProof(session);
  const t = useT();

  const remove = async () => {
    setConfirmed(true);
    setDeleting(true);
    setError(null);
    const err = await deleteAccount();
    setDeleting(false);
    if (err) return setError(err);
    onClose();
    router.replace('/onboarding');
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <PopupBackdrop>
        <Card style={{ alignItems: 'stretch', gap: Spacing.md, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Icon name="trash-outline" size={40} color={colors.wrong} />
          </View>
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {t('অ্যাকাউন্ট মুছবেন?', 'Delete your account?')}
          </AppText>
          <Notice tone="warning">
            {t(
              'আপনার অ্যাকাউন্ট ও সার্ভারে রাখা সব অগ্রগতি স্থায়ীভাবে মুছে যাবে। এটা ফেরানো যাবে না।',
              'Your account and all progress saved on the server will be deleted permanently. This cannot be undone.',
            )}
          </Notice>
          {error && <Notice tone="warning">{error}</Notice>}
          {deleting ? (
            <AppText variant="caption" muted style={{ textAlign: 'center' }}>
              {t('অ্যাকাউন্ট মোছা হচ্ছে…', 'Deleting account…')}
            </AppText>
          ) : proof && !confirmed ? (
            <IdentityCheck proof={proof} reason={t('অ্যাকাউন্ট মুছতে', 'to delete your account')} onConfirmed={remove} />
          ) : (
            <Button title={confirmed ? t('আবার চেষ্টা করুন', 'Try again') : t('মুছুন', 'Delete')} icon="trash-outline" variant="danger" onPress={remove} />
          )}
          <Button title={t('বাতিল', 'Cancel')} variant="ghost" disabled={deleting} onPress={onClose} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}
