import { Suspense } from 'react';
import { ConfirmEmailDialog } from '@/components/ui/confirm-email-dialog';

export default function ConfirmEmailPage() {
  return (
    // Enveloppez le composant qui utilise useSearchParams avec Suspense
    <Suspense fallback={<div>Chargement...</div>}>
      <ConfirmEmailDialog />
    </Suspense>
  );
}
