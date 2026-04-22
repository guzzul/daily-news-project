import { PHASE_PRODUCTION_BUILD } from 'next/constants';

export const NEWS_SITE_BASE_URL = process.env.NEWS_SITE_BASE_URL || "http://localhost:3000";
export const NEWS_SITE_PROXY_ENDPOINT_URL = process.env.NEWS_SITE_PROXY_ENDPOINT_URL || "http://localhost:3000/api";
export const VERCEL_NEWS_API_ENDPOINT_URL = process.env.VERCEL_NEWS_API_ENDPOINT_URL;
export const VERCEL_NEWS_API_TOKEN = process.env.VERCEL_NEWS_API_TOKEN;
export const BASE_URL = VERCEL_NEWS_API_ENDPOINT_URL || NEWS_SITE_PROXY_ENDPOINT_URL;
export const DEFAULT_RETRIES = 3;

export const isBuildTime =
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
