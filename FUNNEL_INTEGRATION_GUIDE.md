# Funnel Integration Guide

Complete guide for funnel builders on integrating with Sweep OS Dashboard analytics.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [API Endpoint Reference](#api-endpoint-reference)
4. [Event Data Structure](#event-data-structure)
5. [Implementation Examples](#implementation-examples)
6. [Tracking Best Practices](#tracking-best-practices)
7. [UTM & Referrer Tracking](#utm--referrer-tracking)
8. [Testing & Debugging](#testing--debugging)
9. [Common Issues](#common-issues)
10. [API Reference](#api-reference)

---

## Overview

Sweep OS tracks funnel events through a simple REST API. You send events when users interact with your funnel, and the dashboard displays analytics, conversion rates, and revenue attribution.

**Key Concepts:**
- **Funnel**: A sequence of steps users go through (e.g., landing page → form → checkout)
- **Event**: A user action at a specific step (e.g., `page_view`, `form_submit`, `payment_succeeded`)
- **Session**: A user's visit to your funnel (tracked via `visitor_id` and `session_id`)
- **Visitor**: A unique user (tracked via `visitor_id`)

---

## Getting Started

### Step 1: Create a Funnel in Sweep OS

1. Log into Sweep OS Dashboard
2. Navigate to **Funnels** tab
3. Click **Create New Funnel**
4. Fill in:
   - **Name**: e.g., "Q1 Landing Page Funnel"
   - **Client** (optional): Link to a client
   - **Domain** (optional): e.g., `example.com` (for auto-detection)
5. Click **Create**
6. **Copy the Funnel ID** - you'll need this for all API calls

### Step 2: Define Funnel Steps

1. In your new funnel, go to the **Steps** tab
2. Add steps in order (e.g., `page_view`, `form_start`, `form_submit`, `payment_succeeded`)
3. Each step needs:
   - **Event Name**: Must match what you send in API calls (e.g., `page_view`)
   - **Label**: Human-readable name (e.g., "Landing Page View")

### Step 3: Integrate Event Tracking

Choose an implementation method below and start sending events.

---

## API Endpoint Reference

### Base URL

```
Production: https://your-domain.com/api
Development: http://localhost:8000
```

### Event Ingestion Endpoint

**POST** `/funnels/events`

**Authentication**: None required (public endpoint)

**Rate Limits**: 
- Default: 1000 requests/minute per funnel
- Contact support for higher limits

**Response Codes**:
- `202 Accepted`: Event received and queued for processing
- `400 Bad Request`: Invalid event data
- `404 Not Found`: Funnel not found
- `500 Internal Server Error`: Server error (event logged for retry)

---

## Event Data Structure

### Required Fields

```json
{
  "funnel_id": "uuid-string",      // REQUIRED: Your funnel ID from Sweep OS
  "event_name": "string",           // REQUIRED: Must match a step in your funnel
  "visitor_id": "string",          // RECOMMENDED: Unique visitor identifier
  "session_id": "string",          // RECOMMENDED: Session identifier
  "metadata": {}                   // OPTIONAL: Additional event data
}
```

### Complete Event Payload

```json
{
  "funnel_id": "c7008b51-2fa6-4843-9dff-581c982c1e43",
  "client_id": "optional-client-uuid",
  "event_name": "page_view",
  "visitor_id": "visitor_abc123",
  "session_id": "session_xyz789",
  "metadata": {
    "page_url": "https://example.com/landing",
    "page_title": "Welcome Page",
    "utm": {
      "source": "google",
      "medium": "cpc",
      "campaign": "summer_sale"
    },
    "referrer": "https://google.com",
    "custom_field": "any_value"
  },
  "event_timestamp": "2024-01-15T10:30:00Z",
  "idempotency_key": "unique-key-123"
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `funnel_id` | UUID string | ✅ Yes | Funnel ID from Sweep OS dashboard |
| `event_name` | String | ✅ Yes | Event name matching a funnel step (1-100 chars) |
| `visitor_id` | String | ⚠️ Recommended | Unique identifier for the user (persist across sessions) |
| `session_id` | String | ⚠️ Recommended | Unique identifier for this session |
| `client_id` | UUID string | ❌ Optional | Link event to a specific client |
| `metadata` | Object | ❌ Optional | Additional event data (max 8KB) |
| `event_timestamp` | ISO 8601 | ❌ Optional | When event occurred (defaults to now) |
| `idempotency_key` | String | ❌ Optional | Prevent duplicate events (recommended for payments) |

### Metadata Best Practices

**Always Include:**
```json
{
  "page_url": "https://example.com/current-page",
  "page_title": "Page Title",
  "utm": { /* UTM params */ },
  "referrer": "https://source.com"
}
```

**For Form Events:**
```json
{
  "form_fields": ["email", "name"],
  "form_id": "contact-form-1"
}
```

**For Payment Events:**
```json
{
  "amount_cents": 5000,
  "currency": "usd",
  "payment_method": "card",
  "transaction_id": "txn_123"
}
```

---

## Implementation Examples

### Next.js / React

```typescript
// lib/track.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const FUNNEL_ID = process.env.NEXT_PUBLIC_FUNNEL_ID || 'your-funnel-id';

// Generate or retrieve visitor ID (persist in localStorage)
function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
}

// Generate or retrieve session ID (new each visit)
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

// Extract UTM parameters from URL
function getUTMParams(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['source', 'medium', 'campaign', 'term', 'content'].forEach(key => {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value;
  });
  return Object.keys(utm).length > 0 ? utm : undefined;
}

// Get referrer (where user came from)
function getReferrer(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.referrer || undefined;
}

// Track event
export async function trackEvent(
  eventName: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await axios.post(
      `${API_BASE_URL}/funnels/events`,
      {
        funnel_id: FUNNEL_ID,
        event_name: eventName,
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        metadata: {
          ...metadata,
          page_url: window.location.href,
          page_title: document.title,
          utm: getUTMParams(),
          referrer: getReferrer(),
        },
        event_timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Failed to track event:', error);
    // Don't throw - tracking failures shouldn't break your app
  }
}

// Usage in components
import { useEffect } from 'react';
import { trackEvent } from '@/lib/track';

export default function LandingPage() {
  useEffect(() => {
    // Track page view on mount
    trackEvent('page_view');
  }, []);

  const handleFormStart = () => {
    trackEvent('form_start', {
      form_id: 'contact-form',
    });
  };

  const handleFormSubmit = async (formData: any) => {
    trackEvent('form_submit', {
      form_id: 'contact-form',
      form_fields: Object.keys(formData),
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} onFocus={handleFormStart}>
        {/* Your form */}
      </form>
    </div>
  );
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>Landing Page</title>
  <script>
    // Configuration
    const API_BASE_URL = 'http://localhost:8000';
    const FUNNEL_ID = 'your-funnel-id-here';

    // Visitor/Session Management
    function getVisitorId() {
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitor_id', visitorId);
      }
      return visitorId;
    }

    function getSessionId() {
      let sessionId = sessionStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('session_id', sessionId);
      }
      return sessionId;
    }

    // UTM & Referrer
    function getUTMParams() {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['source', 'medium', 'campaign', 'term', 'content'].forEach(key => {
        const value = params.get('utm_' + key);
        if (value) utm[key] = value;
      });
      return Object.keys(utm).length > 0 ? utm : undefined;
    }

    function getReferrer() {
      return document.referrer || undefined;
    }

    // Track Event
    async function trackEvent(eventName, metadata = {}) {
      try {
        const response = await fetch(API_BASE_URL + '/funnels/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            funnel_id: FUNNEL_ID,
            event_name: eventName,
            visitor_id: getVisitorId(),
            session_id: getSessionId(),
            metadata: {
              ...metadata,
              page_url: window.location.href,
              page_title: document.title,
              utm: getUTMParams(),
              referrer: getReferrer(),
            },
            event_timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error('Tracking failed:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to track event:', error);
      }
    }

    // Track page view on load
    window.addEventListener('load', () => {
      trackEvent('page_view');
    });

    // Track form interactions
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('contact-form');
      if (form) {
        form.addEventListener('focus', () => {
          trackEvent('form_start', { form_id: 'contact-form' });
        }, true);

        form.addEventListener('submit', (e) => {
          trackEvent('form_submit', {
            form_id: 'contact-form',
            form_fields: Array.from(form.elements)
              .filter(el => el.name)
              .map(el => el.name),
          });
        });
      }
    });
  </script>
</head>
<body>
  <h1>Welcome</h1>
  <form id="contact-form">
    <input name="email" type="email" placeholder="Email" required>
    <input name="name" type="text" placeholder="Name" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

### Google Tag Manager (GTM)

1. **Create Custom HTML Tag**:

```html
<script>
(function() {
  const API_BASE_URL = 'http://localhost:8000';
  const FUNNEL_ID = 'your-funnel-id-here';

  // Visitor/Session management (same as vanilla JS)
  function getVisitorId() {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  function getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  // Track function
  window.trackFunnelEvent = function(eventName, metadata) {
    fetch(API_BASE_URL + '/funnels/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        funnel_id: FUNNEL_ID,
        event_name: eventName,
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        metadata: metadata || {},
        event_timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  };

  // Track page view
  window.trackFunnelEvent('page_view', {
    page_url: window.location.href,
    page_title: document.title,
  });
})();
</script>
```

2. **Create Data Layer Events**:

```javascript
// In your page code or GTM triggers
dataLayer.push({
  'event': 'funnel_event',
  'funnel_event_name': 'form_submit',
  'funnel_metadata': {
    'form_id': 'contact-form',
  }
});
```

3. **Create GTM Trigger**: Custom Event → Event name = `funnel_event`

4. **Create GTM Tag**: Custom HTML → Call `trackFunnelEvent(dataLayer.funnel_event_name, dataLayer.funnel_metadata)`

---

## Tracking Best Practices

### 1. Visitor & Session IDs

**Visitor ID**: Should persist across sessions (use `localStorage`)
- Same user on different devices = different visitor IDs
- Same user on same device = same visitor ID

**Session ID**: Should reset each visit (use `sessionStorage`)
- New browser tab = new session
- Page refresh = same session
- Close tab and return = new session

### 2. Event Naming

**Use consistent, descriptive names:**
- ✅ Good: `page_view`, `form_start`, `form_submit`, `payment_succeeded`
- ❌ Bad: `click`, `submit`, `done`, `event1`

**Match funnel step names exactly:**
- Event name in API call must match step `event_name` in Sweep OS

### 3. Idempotency Keys

**Always use for payment events:**
```javascript
trackEvent('payment_succeeded', {
  amount_cents: 5000,
  transaction_id: 'txn_123',
}, 'payment_txn_123'); // idempotency_key
```

**Format**: `{event_type}_{unique_id}` (e.g., `payment_txn_123`)

### 4. Error Handling

**Never block user flow:**
```javascript
try {
  await trackEvent('form_submit');
} catch (error) {
  // Log but don't throw
  console.error('Tracking failed:', error);
  // Continue with form submission
}
```

### 5. Performance

**Send events asynchronously:**
- Don't await tracking calls
- Use `fire-and-forget` pattern
- Consider batching for high-volume events

---

## UTM & Referrer Tracking

### Automatic UTM Extraction

The tracking code automatically extracts UTM parameters from the URL:

```
https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=summer
```

Extracts:
```json
{
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "summer"
  }
}
```

### Referrer Tracking

Automatically captures `document.referrer`:
- Direct visit: `referrer` = `null`
- From Google: `referrer` = `https://www.google.com`
- From your site: `referrer` = `https://your-site.com/previous-page`

### Attribution

UTM and referrer data is:
- Stored per session (first event sets it)
- Linked to all events in that session
- Available in analytics dashboard
- Used for conversion attribution

---

## Testing & Debugging

### 1. Test Event Ingestion

```bash
curl -X POST http://localhost:8000/funnels/events \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "your-funnel-id",
    "event_name": "page_view",
    "visitor_id": "test_visitor_123",
    "session_id": "test_session_456",
    "metadata": {
      "page_url": "https://example.com/test",
      "page_title": "Test Page"
    }
  }'
```

**Expected Response:**
```json
{
  "event_id": "uuid-here",
  "status": "accepted"
}
```

### 2. Verify Events in Dashboard

1. Go to Sweep OS → Funnels → Your Funnel
2. Click **Events** tab
3. You should see your test event within seconds

### 3. Check Event Health

1. Go to **Health** tab in funnel
2. Check:
   - **Last Event At**: Should be recent
   - **Events Per Minute**: Should be > 0
   - **Error Count**: Should be 0

### 4. Browser Console Debugging

```javascript
// Enable verbose logging
window.DEBUG_FUNNEL_TRACKING = true;

// Modified trackEvent with logging
async function trackEvent(eventName, metadata) {
  if (window.DEBUG_FUNNEL_TRACKING) {
    console.log('📊 Tracking:', eventName, metadata);
  }
  
  try {
    const response = await fetch(API_BASE_URL + '/funnels/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        funnel_id: FUNNEL_ID,
        event_name: eventName,
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        metadata: { ...metadata, page_url: window.location.href },
      }),
    });

    if (window.DEBUG_FUNNEL_TRACKING) {
      console.log('✅ Tracked:', await response.json());
    }
  } catch (error) {
    console.error('❌ Tracking failed:', error);
  }
}
```

---

## Common Issues

### Issue: Events Not Appearing in Dashboard

**Check:**
1. ✅ Funnel ID is correct
2. ✅ Event name matches a funnel step
3. ✅ API endpoint is correct
4. ✅ No CORS errors in browser console
5. ✅ Check Health tab for errors

**Solution:**
- Verify funnel ID: Copy from Sweep OS dashboard
- Check event name: Must match step `event_name` exactly (case-sensitive)
- Test with curl first to isolate frontend issues

### Issue: UTM Parameters Not Captured

**Check:**
1. ✅ UTM params in URL: `?utm_source=google`
2. ✅ Tracking code includes `getUTMParams()`
3. ✅ UTM passed in metadata

**Solution:**
- Ensure UTM params are in URL before page load
- Check browser console for UTM extraction
- Verify metadata includes `utm` object

### Issue: Visitor ID Changes on Refresh

**Check:**
1. ✅ Using `localStorage` (not `sessionStorage`)
2. ✅ localStorage is enabled (not in private mode)
3. ✅ Same domain (localStorage is domain-specific)

**Solution:**
- Use `localStorage.getItem('visitor_id')` for visitor
- Use `sessionStorage.getItem('session_id')` for session
- Check browser privacy settings

### Issue: Duplicate Events

**Solution:**
- Use `idempotency_key` for critical events (payments)
- Format: `{event_type}_{unique_id}`
- Server will reject duplicates with same key

### Issue: CORS Errors

**Check:**
1. ✅ API base URL is correct
2. ✅ CORS headers configured on backend
3. ✅ Not mixing HTTP/HTTPS

**Solution:**
- Ensure API URL matches your backend
- Check backend CORS configuration
- Use HTTPS in production

---

## API Reference

### POST /funnels/events

Ingest a funnel event.

**Request:**
```http
POST /funnels/events
Content-Type: application/json

{
  "funnel_id": "uuid",
  "event_name": "string",
  "visitor_id": "string",
  "session_id": "string",
  "metadata": {},
  "event_timestamp": "ISO8601",
  "idempotency_key": "string"
}
```

**Response:**
```json
{
  "event_id": "uuid",
  "status": "accepted"
}
```

**Status Codes:**
- `202 Accepted`: Event queued successfully
- `400 Bad Request`: Invalid payload
- `404 Not Found`: Funnel not found
- `500 Internal Server Error`: Server error

### GET /funnels/{funnel_id}/analytics

Get funnel analytics (requires authentication).

**Query Parameters:**
- `range`: Number of days (1-365, default: 30)

**Response:**
```json
{
  "funnel_id": "uuid",
  "range_days": 30,
  "step_counts": [
    {
      "step_order": 1,
      "label": "Landing Page",
      "event_name": "page_view",
      "count": 1000,
      "conversion_rate": null
    },
    {
      "step_order": 2,
      "label": "Form Submit",
      "event_name": "form_submit",
      "count": 500,
      "conversion_rate": 50.0
    }
  ],
  "total_visitors": 1000,
  "total_conversions": 500,
  "overall_conversion_rate": 50.0,
  "bookings": 100,
  "revenue_cents": 500000
}
```

### GET /funnels/events

Explore events (requires authentication).

**Query Parameters:**
- `funnel_id`: Filter by funnel (optional)
- `event_name`: Filter by event name (optional)
- `visitor_id`: Filter by visitor (optional)
- `start_date`: ISO8601 date (optional)
- `end_date`: ISO8601 date (optional)
- `limit`: Results per page (1-200, default: 50)
- `offset`: Pagination offset (default: 0)

**Response:**
```json
[
  {
    "id": "uuid",
    "funnel_id": "uuid",
    "event_name": "page_view",
    "visitor_id": "visitor_123",
    "session_id": "session_456",
    "metadata": {},
    "utm": { "source": "google" },
    "referrer": "https://google.com",
    "occurred_at": "2024-01-15T10:30:00Z",
    "received_at": "2024-01-15T10:30:01Z"
  }
]
```

---

## Quick Reference

### Required Environment Variables

```bash
# Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_FUNNEL_ID=your-funnel-id-here
```

### Event Names Checklist

- ✅ Matches funnel step `event_name` exactly
- ✅ Lowercase with underscores (e.g., `page_view`)
- ✅ Descriptive and specific
- ✅ Consistent across your codebase

### Metadata Checklist

- ✅ `page_url`: Current page URL
- ✅ `page_title`: Page title
- ✅ `utm`: UTM parameters object
- ✅ `referrer`: HTTP referrer
- ✅ Event-specific data (form fields, payment amount, etc.)

### Testing Checklist

- ✅ Test with curl first
- ✅ Verify in Events tab
- ✅ Check Health tab for errors
- ✅ Test UTM parameter capture
- ✅ Test visitor/session persistence
- ✅ Test idempotency for payments

---

## Support

For issues or questions:
1. Check this guide first
2. Review Health tab in dashboard
3. Check browser console for errors
4. Test with curl to isolate issues
5. Contact support with:
   - Funnel ID
   - Event payload (sanitized)
   - Error messages
   - Browser/network logs

---

**Last Updated**: January 2024
**Version**: 1.0

