# SparkDex Installation

## Requirements

- Node.js 20+
- npm 10+

## Local setup

```bash
git clone https://github.com/your-org/sparkdex.git
cd sparkdex
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Notes

- Mock data is enabled by default.
- Keep real provider credentials in `.env.local` only.
