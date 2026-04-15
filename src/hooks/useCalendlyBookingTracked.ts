import { useEffect } from 'react';
import { trackEvent } from '@/lib/track';

type EmbedLocation = 'home' | 'resource_page';

/**
 * Listens for Calendly inline embed completion (postMessage).
 * @see https://developer.calendly.com/docs/event-scheduled
 */
export function useCalendlyBookingTracked(embedLocation: EmbedLocation) {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if ((data as { event?: string }).event !== 'calendly.event_scheduled') return;

      const payload = (data as { payload?: { event?: { uri?: string }; invitee?: { uri?: string } } })
        .payload;
      void trackEvent('call_booked', {
        embed_location: embedLocation,
        calendly_event_uri: payload?.event?.uri,
        calendly_invitee_uri: payload?.invitee?.uri,
      });
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [embedLocation]);
}
