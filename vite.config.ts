import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Actions sets GITHUB_REPOSITORY to "owner/repository".
// A project Pages site requires /repository/ as the asset base path.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repo && !repo.endsWith('.github.io') ? `/${repo}/` : '/';

export default defineConfig({ plugins: [react()], base });
