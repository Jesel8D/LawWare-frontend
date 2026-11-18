import { Auth0Client } from '@auth0/nextjs-auth0/server';

export function authConfigured() {
  const values = [process.env.AUTH0_DOMAIN, process.env.AUTH0_CLIENT_ID, process.env.AUTH0_CLIENT_SECRET, process.env.AUTH0_SECRET, process.env.APP_BASE_URL, process.env.AUTH0_AUDIENCE];
  return values.every(value => !!value?.trim()) && process.env.AUTH0_AUDIENCE?.trim() !== process.env.AUTH0_CLIENT_ID?.trim();
}
export const auth0 = authConfigured() ? new Auth0Client({
  authorizationParameters: { audience: process.env.AUTH0_AUDIENCE },
  enableAccessTokenEndpoint: false,
}) : null;
