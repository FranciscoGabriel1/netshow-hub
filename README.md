# Netshow Hub

Netshow Hub is a video listing and playback application built with Next.js 15 (App Router), React, and Material UI. It consumes data from a simulated JSON REST API (`json-server`) to display paginated video lists, group by categories, and show detailed video pages with an HLS player, view/like counters, and share functionality.

Repository: https://github.com/FranciscoGabriel1/netshow-hub.git

## Tech Stack

- Next.js 15 (App Router)  
- React 18+  
- TypeScript  
- Material UI v5 (MUI)  
- Emotion (styling engine for MUI)  
- Axios (HTTP client wrapper)  
- json-server (mock REST API)  

## Prerequisites

- Node.js ≥ 18.x  
- npm ≥ 9.x or pnpm ≥ 8.x  
- Git (for cloning the repo)  

## Installation

```bash
git clone https://github.com/FranciscoGabriel1/netshow-hub.git
cd netshow-hub
npm install
```

Or with pnpm:

```bash
git clone https://github.com/FranciscoGabriel1/netshow-hub.git
cd netshow-hub
pnpm install
```

Install Emotion dependencies (required by MUI v5):

```bash
npm install @emotion/react @emotion/styled
```

Or with pnpm:

```bash
pnpm add @emotion/react @emotion/styled
```

## JSON-Server Setup

The `json-server` provides the following endpoints.



1. Ensure `db.json` is present in the project root.  
2. Start the JSON-Server:

   ```bash
   npm run api
   ```

   Or with pnpm:

   ```bash
   pnpm api
   ```

Access the API at `http://localhost:3000`:

- `http://localhost:3000/videos`  
- `http://localhost:3000/videos?_page=1&_per_page=10`  
- `http://localhost:3000/videos/:id`  
- `http://localhost:3000/categories`  
- `http://localhost:3000/sites`  

## Environment Configuration

By default, the application points to `http://localhost:3000` as the base URL for API calls. If you need to change this, edit:

```ts
// src/services/httpClient.ts
export const httpClient = new HttpClient('http://localhost:3000');
```

## Development Server

1. Ensure JSON-Server is running.  
2. In a separate terminal, start Next.js in development mode:

   ```bash
   npm run dev
   ```

   Or with pnpm:

   ```bash
   pnpm dev
   ```

3. Open `http://localhost:3002` in your browser.

## Production Build

1. Build the Next.js application:

   ```bash
   npm run build
   ```

   Or with pnpm:

   ```bash
   pnpm build
   ```

2. Start the production server:

   ```bash
   npm run start
   ```

   Or with pnpm:

   ```bash
   pnpm start
   ```

3. Open `http://localhost:3002` in your browser.


## Available Scripts

```jsonc
{
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "next start -p 3002",
    "lint": "next lint",
    "api": "json-server db.json --port 3000",
    "test": "jest"
  }
}
```

- `npm run dev` (or `pnpm dev`): Start Next.js in development mode on port 3002.  
- `npm run api` (or `pnpm api`): Start JSON-Server on port 3000.  
- `npm run build` (or `pnpm build`): Build Next.js for production.  
- `npm run start` (or `pnpm start`): Start Next.js production server on port 3002.  
- `npm run lint` (or `pnpm lint`): Run ESLint and type-check.  
- `npm run test` (or `pnpm test`): Run Jest unit tests.

## Testing

**Unit Tests** with Jest & React Testing Library:  
- Hooks: `useVideos`, `useCategories`, `useSnackbar`.  
- Services: `videoService` (mocking `httpClient`).  
- Components: `VideoCard`, `ClientVideoDetail`.  

```bash
npm run test
```

Or with pnpm:

```bash
pnpm test
```

## Contribution

1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature
   ```  
3. Make your changes with clear, concise commits.  
4. Push to your fork and open a Pull Request describing the changes.

