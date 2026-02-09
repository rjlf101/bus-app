# Bus Arrival Times App

A single-page React application built with TypeScript that displays real-time bus arrival information from Transport for London (TfL).

## Features

- 📍 Real-time bus arrival times for a specific stop
- 🚌 Grouped by bus route number
- ⏱️ Countdown timer showing minutes until arrival
- 🎯 Shows destination for each bus
- 🔄 Auto-refreshes every 1 minute
- 📱 Responsive design for mobile and desktop

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Navigate to the project directory:
   ```bash
   cd c:\dev\bus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Customization

### Change the Bus Stop

To query a different TfL bus stop, edit `src/api.ts` and update the `API_URL`:

```typescript
const API_URL = 'https://api.tfl.gov.uk/StopPoint/YOUR_STOP_ID/arrivals';
```

You can find stop IDs using the TfL API or their website.

### Change Auto-Refresh Interval

Edit `src/App.tsx` and modify the interval value (in milliseconds):

```typescript
const interval = setInterval(() => {
  loadArrivals();
}, 60000); // Change this value (60000 = 1 minute)
```

### Styling

All styles are in `src/App.css`. You can customize colors, fonts, and layout to match your preferences.

## Project Structure

```
bus-app/
├── src/
│   ├── App.tsx          # Main React component
│   ├── App.css          # Styles
│   ├── api.ts           # API service for fetching data
│   ├── types.ts         # TypeScript type definitions
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TfL Unified API** - Transport for London bus data

## API Information

This app uses the Transport for London (TfL) Unified API:
- Endpoint: `https://api.tfl.gov.uk/StopPoint/{stopId}/arrivals`
- No API key required for basic usage
- Rate limits apply (500 requests per minute)

## Troubleshooting

**CORS Errors**: The TfL API should allow CORS requests. If you encounter issues, you may need to run the app through a proxy in production.

**No Data**: Ensure the stop ID in the API URL is correct and that buses are scheduled to arrive at that stop.

**Build Errors**: Make sure you have Node.js 16+ installed and all dependencies are properly installed with `npm install`.

## License

This project is open source and available for personal use.
