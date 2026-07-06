/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
  interface Env {
    /**
     * Dev only: `https://….tryhydrogen.dev` from the terminal after `npm run dev`.
     * Lets you use localhost for the rest of the site while /account/* redirects to the tunnel (required for Customer Account OAuth).
     */
    PUBLIC_DEV_TUNNEL_ORIGIN?: string;
  }
}
