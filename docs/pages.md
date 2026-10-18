# Techosoul UI web deployment

The repository is [morimdn/Techosoul-UI](https://github.com/morimdn/Techosoul-UI).
Its GitHub Pages project-site address is
**https://morimdn.github.io/Techosoul-UI/**. The production build uses
`/Techosoul-UI/` as its Vite base, including CSS, fonts and lazy-loaded modules.
The existing Showcase includes the component catalog, documentation and live CRM
example, with Light/Dark and Comfortable/Compact modes. It is not the umbrella
brand's corporate website. npm publication status remains unchanged.

## Validate without deploying

```sh
npm ci
npm run build:demo
npm run docs:check
npx playwright install chromium
npm run test:pages
```

`test:pages` rebuilds the same production artifact and serves it locally at
`http://127.0.0.1:4173/Techosoul-UI/`. It checks asset paths/responses, local fonts,
lazy component views, documentation deep-link reloads, CRM query navigation,
branding and both theme/density controls. CI runs this alongside the existing
full browser and compatibility matrix. No deployment credentials are needed.
For a manual preview after building:

```sh
npx vite preview --host 127.0.0.1 --port 4173 --base=/Techosoul-UI/
```

Navigation uses hash anchors and `?view=crm` on the same HTML entry point,
so project-site deep links survive reload without a server-side SPA fallback.
Do not introduce origin-root `/assets/...` URLs or history-based routes without
revisiting static hosting. Vite handles imported assets relative to the selected
base; use `import.meta.env.BASE_URL` for future public-directory assets.

## Owner deployment after this PR merges

1. Review CI on updated `main`. In the renamed repository, verify **Settings →
   Pages → Build and deployment → Source: GitHub Actions**. Keep the custom-domain
   field unset for this project-site deployment. Review any existing
   `github-pages` environment approval requirements.
2. Open **Actions → Publish web demo → Run workflow**, select **main**, and run
   it manually. The existing `workflow_dispatch` trigger is unchanged. The build
   uploads `dist`; only the main-branch deploy job receives Pages/OIDC permissions.
3. Approve the `github-pages` environment if required. Inspect the deployment
   URL reported by Actions; open `/Techosoul-UI/`, documentation hash links and
   `?view=crm`, then check themes/density and asset loading.
4. If verification fails, inspect the build/deployment logs and fix via a PR;
   rerun the workflow manually after review. There is no push/PR deployment.

Existing clones can update their remote without recloning or rewriting history:

```sh
git remote set-url origin https://github.com/morimdn/Techosoul-UI.git
git fetch origin
```

The former `/Fintrix-UI/` Pages address is historical. GitHub repository redirects
are not a guarantee of Pages URL redirects. This change preserves project-site
hosting at the renamed repository's `/Techosoul-UI/` path. Serving the old URL
would require separately authorized hosting/redirect configuration; no old-path
redirect or second repository is created here. Historical reports retain their
original URLs and results.

## Future ui.techosoul.com (not activated)

Reserve **techosoul.com** for the future umbrella-brand website. The React UI
Showcase's future custom domain is **ui.techosoul.com**, hosted at its origin
root. A later owner-authorized migration must:

1. Verify control of the domain in GitHub's Pages domain-verification settings
   using GitHub's supplied TXT record, then configure the repository Pages custom
   domain as `ui.techosoul.com`. Follow the current GitHub verification instructions;
   do not guess the TXT challenge or enable wildcard records.
2. Add a DNS **CNAME** for `ui` pointing to **morimdn.github.io** (no protocol,
   path or repository name). Remove conflicting records for `ui` only. Do not
   change the apex `techosoul.com` records or redirect it to the Showcase.
3. In a reviewed PR, change `build:demo` from `--base=/Techosoul-UI/` to
   `--base=/`, update the production browser test's base URL/asset expectations
   and preview command to `/`, and update public site links to
   `https://ui.techosoul.com/`. The application needs no router rewrite: it
   already uses query/hash navigation and Vite-managed assets.
4. For this GitHub Actions deployment, configure the custom domain through Pages
   settings; a `CNAME` file alone does not configure an Actions-deployed site.
   Wait for DNS verification and certificate provisioning, enable **Enforce HTTPS**,
   and only then manually deploy and test assets, navigation and any GitHub-provided
   project-site redirect. Do not assume both base paths can serve one build.

No DNS, Pages settings, custom domain, CNAME file or deployment is changed by
this PR. See [GitHub custom subdomain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)
and [Vite static deployment](https://vite.dev/guide/static-deploy.html#github-pages).

Repository rename also requires verifying any npm Trusted Publisher binding uses
`morimdn/Techosoul-UI` before a separately authorized release. See
[npm owner setup](npm-owner-setup.md); this web migration does not authorize npm.
