import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
// Auth0 login requires a full browser navigation to initiate the transaction.
export default defineConfig([...nextVitals, ...nextTs, { files: ['src/app/acceso/page.tsx', 'src/features/academic/real-workspace.tsx'], rules: { '@next/next/no-html-link-for-pages': 'off' } }, globalIgnores(['.next/**', 'out/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**'])]);
