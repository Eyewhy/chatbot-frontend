import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LegacyApp = dynamic(() => import('../src/App'), { ssr: false });

export default function LegacyPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const pathname = router.asPath.split('?')[0] || '/search';
    if (!window.location.hash || window.location.hash === '#/') {
      window.history.replaceState(null, '', `${pathname}${window.location.search}#${pathname}`);
    }
    setReady(true);
  }, [router.asPath]);

  return ready ? <LegacyApp /> : null;
}
