# AI Powered Writing Assistant

Student-focused writing assistant built with Next.js and local Ollama.

## Core Features

- Essay input editor with word and readability indicators.
- Grammar correction suggestions.
- Improved essay output with better sentence structure.
- Vocabulary upgrade suggestions.
- Easy side-by-side comparison of original vs improved writing.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Local Ollama model (default: gpt-oss:120b)

## Environment

Create or update `.env.local`:

```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gpt-oss:120b
```

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API Endpoints

- `POST /api/grammar`
- `POST /api/enhance`
- `POST /api/vocabulary`
- `POST /api/full-review`
- `POST /api/stream`
- `GET /api/health`

## Build Check

```bash
npm run build
```
