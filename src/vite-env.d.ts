/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Sweep OS API origin including /api, e.g. https://app.example.com/api */
  readonly VITE_FUNNEL_API_BASE_URL?: string;
  /** Override default funnel UUID when needed */
  readonly VITE_FUNNEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
