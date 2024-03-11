'use client';

import { redirect } from 'next/navigation'
import { useEffect } from 'react';

export default function Redirect({ }) {

  // Redirection based on language
  useEffect(() => {
    const userLanguage = navigator.language;
    if (userLanguage.startsWith('de')) {
      redirect('/de')
    } else {
      redirect('/en')
    }
  }, [])
  return null;
}