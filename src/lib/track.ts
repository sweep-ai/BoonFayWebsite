/** Sweep OS funnel events — see FUNNEL_INTEGRATION_GUIDE.md */

const DEFAULT_FUNNEL_ID = 'd6e06411-ea6f-441e-b03d-0a7b3cf445bf';

function getFunnelId(): string {
  return import.meta.env.VITE_FUNNEL_ID || DEFAULT_FUNNEL_ID;
}

function getApiBase(): string {
  const raw = import.meta.env.VITE_FUNNEL_API_BASE_URL?.trim() ?? '';
  return raw.replace(/\/$/, '');
}

function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function getUTMParams(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  (['source', 'medium', 'campaign', 'term', 'content'] as const).forEach((key) => {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value;
  });
  return Object.keys(utm).length > 0 ? utm : undefined;
}

function getReferrer(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.referrer || undefined;
}

export type TrackMetadata = Record<string, unknown>;

export async function trackEvent(
  eventName: string,
  metadata?: TrackMetadata,
  options?: { idempotency_key?: string }
): Promise<void> {
  const base = getApiBase();
  if (!base) {
    if (import.meta.env.DEV) {
      console.debug('[funnel] skip track (VITE_FUNNEL_API_BASE_URL unset):', eventName, metadata);
    }
    return;
  }

  try {
    const body: Record<string, unknown> = {
      funnel_id: getFunnelId(),
      event_name: eventName,
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      metadata: {
        ...metadata,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        page_title: typeof document !== 'undefined' ? document.title : undefined,
        utm: getUTMParams(),
        referrer: getReferrer(),
      },
      event_timestamp: new Date().toISOString(),
    };
    if (options?.idempotency_key) {
      body.idempotency_key = options.idempotency_key;
    }

    await fetch(`${base}/funnels/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('Failed to track funnel event:', eventName, err);
  }
}
