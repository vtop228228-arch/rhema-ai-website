'use client';
import { resetConsent } from '@/lib/analytics-consent';

export default function CookieSettingsButton({ label }: { label: string }) {
  return <button type="button" onClick={resetConsent}>{label}</button>;
}
