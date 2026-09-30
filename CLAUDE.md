# Spoiler Safe

## Goal
A spoiler-aware RAG (Retrieval-Augmented Generation) chatbot for TV shows. Users set how far they've watched in a series, and the system must never reveal information from episodes beyond that point.

## Stack
- **Frontend & Framework**: Next.js App Router, plain JavaScript (no TypeScript; JSDoc comments for important function signatures)
- **UI**: Material UI (MUI)
- **Database & Auth**: Supabase (PostgreSQL + pgvector + Supabase Auth)
- **Embeddings**: Cohere embeddings and rerank
- **LLM**: Groq Llama 3.3 70B
- **Deployment**: Vercel

## Core Rule: Retrieval as Authorization Boundary
The retrieval layer is an authorization boundary. Filtering by episode must happen in the database, server-side, never in the client or only in the prompt.
- Episode filtering happens in SQL queries against Supabase
- The API gateway validates the user's watch progress before returning any data
- Prompt-level filtering is a secondary defense, not the primary mechanism

## Security Rules
- **Never expose to the browser**: `SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`, `COHERE_API_KEY`
- **Never commit**: `.env` files or any file containing secrets
- All API calls from the browser must go through Next.js route handlers that validate auth and permissions
- Private keys stay in server-side environment variables only

## Folder Layout
```
src/
  app/
    (routes)           # Page routes
    api/               # API routes and route handlers
  lib/
    clients/           # Supabase, Groq, Cohere client setup
    retrieval/         # RAG query logic, embedding, reranking
    generation/        # LLM response generation
    auth/              # Auth helpers
scripts/               # Data ingestion, evaluation, utilities
  ingest.js           # Ingest raw episode data into Supabase
  eval.js             # Run evaluation sets
data/
  raw/                 # Raw episode JSON from sources
  processed/           # Cleaned, chunked episode data ready for indexing
eval/
  test-sets/          # Benchmark queries and expected answers
  results/            # Evaluation run results
public/               # Static assets
```

## Working Style
- Small, focused steps with clear descriptions of changes
- Add tests for core logic (retrieval filtering, embedding validation)
- Verify features in the browser before marking complete
- Commit often with clear commit messages

## Language Rules
- **JavaScript only** – never create `.ts` or `.tsx` files
- Use `.js` for everything, including React components
- Validate external data (API responses, request bodies, JSON files) with Zod at runtime since there is no compile-time type checking
- Run scripts with: `node --env-file=.env.local path/to/script.js`
- Use JSDoc comments for important function signatures:
  ```js
  /**
   * @param {string} showId - The TV show ID
   * @param {number} episode - Episode number (1-indexed)
   * @returns {Promise<Object[]>} Array of episode chunks with embeddings
   */
  async function fetchEpisodeChunks(showId, episode) { ... }
  ```

## Environment Variables
Create a `.env.local` file (never commit) with:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GROQ_API_KEY=...
COHERE_API_KEY=...
```
