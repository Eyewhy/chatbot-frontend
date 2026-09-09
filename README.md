# Helper4me frontend

The frontend now runs on Next.js. Public helper and agency pages are server-rendered so their content and metadata are available to search engines. Existing account and admin screens remain available through the legacy client-side application during incremental migration.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## SEO routes

- `/search` - server-rendered helper search results.
- `/biodata/[id]` - server-rendered helper profile pages.
- `/organization` - server-rendered agency directory.
- `/organization/[id]` - server-rendered agency pages and helper profiles.

Public pages fetch data from `https://backend.acei.com.sg` on the server. Set `NEXT_PUBLIC_BACKEND_URL` for another backend environment.

## Available Scripts

- `npm run dev` - start the Next.js development server.
- `npm run build` - create a production build.
- `npm start` - serve the production build.
- `npm test` - run the existing legacy React test suite.

## Deployment

Next.js requires a Node.js server (`next start`) or a compatible managed deployment target. The previous static Nginx deployment cannot serve SSR routes without a reverse proxy to the Next.js process.

## Remaining TODO
- [ ] individual view chat
- [ ] individual view helper
- [ ] upload qna
- [ ] delete qna
- [ ] upload helper file
- [x] refresh embeddings

# Legacy Create React App notes

The original client-side app remains under `src/` and is mounted for non-public routes while those screens are migrated.
