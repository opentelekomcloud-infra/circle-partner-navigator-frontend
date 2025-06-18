'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function UmamiTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.umami === 'function') {
      window.umami.track(pathname);
    }
  }, [pathname]);

  return null;
}