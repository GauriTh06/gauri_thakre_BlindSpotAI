'use client';

import React from 'react';
import { DecisionJournalView } from '@/components/journal/DecisionJournalView';
import { useAuth } from '@/context/AuthContext';

export default function JournalPage() {
  const { effectiveUserId } = useAuth();
  return <DecisionJournalView userId={effectiveUserId} />;
}
