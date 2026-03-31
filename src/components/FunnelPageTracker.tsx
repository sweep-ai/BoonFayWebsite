import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '@/lib/track';

/**
 * Fires `page_view` on SPA navigations with route context in metadata.
 */
export default function FunnelPageTracker() {
  const location = useLocation();
  const initial = useRef(true);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    void trackEvent('page_view', {
      route_path: location.pathname,
      route_search: location.search || undefined,
      route_full: path,
      is_spa_navigation: !initial.current,
    });
    initial.current = false;
  }, [location.pathname, location.search]);

  return null;
}
