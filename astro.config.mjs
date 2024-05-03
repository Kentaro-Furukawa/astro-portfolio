import { defineConfig } from 'astro/config';
import serviceWorker from "astrojs-service-worker";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [partytown(), serviceWorker()]
});