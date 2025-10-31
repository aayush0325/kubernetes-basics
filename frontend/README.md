# Redis Status Manager Frontend

A Next.js frontend application that interacts with the backend API to set and get status values from Redis.

## Features

- Set status values in Redis
- Retrieve current status from Redis
- Clean, modern UI with Tailwind CSS
- Real-time feedback on operations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure the backend URL in `.env.local` (injected at runtime):
```
BACKEND_URL=http://localhost:8080
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints Used

- `GET /set/:value` - Sets the "status" key in Redis
- `GET /get/status` - Gets the "status" key from Redis

## Environment Variables

- `BACKEND_URL` - The URL of the backend API (injected at runtime, default: http://localhost:8080)
