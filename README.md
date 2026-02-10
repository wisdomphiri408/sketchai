# SketchAI

SketchAI is a Next.js app that explains ideas in simple language and can render tiny inline animations such as a bouncing ball directly in the response text.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- `motion/react`
- Google Gemini API (free API key from Google AI Studio)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Add your Google API key in `.env.local`:

```bash
GOOGLE_API_KEY=...
```

4. Run development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Inline animation tags

The model can return tags like:

- `[anim:bounce-ball]`
- `[anim:pulse-dot]`

Those tags are parsed and rendered as animated inline components.
