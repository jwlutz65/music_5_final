# Paranoid Visualizer

A Next.js web application that visualizes the cultural impact and musical influences of Black Sabbath's "Paranoid" through interactive data visualizations.

## Features

- **Influence Graph**: Interactive D3.js force-directed graph showing musical and cultural connections
- **Historical Timeline**: Navigate through key events in the album's history
- **Audio Analysis**: WaveSurfer.js waveform player with annotated regions and vinyl record animation
- **Gaming Culture Impact**: Charts showing "Paranoid" usage in video games like Helldivers

## Tech Stack

- **Framework**: Next.js 13 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Paranoid album theme
- **UI Components**: shadcn/ui
- **Visualizations**: D3.js, WaveSurfer.js, Recharts
- **Database**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Testing**: Jest, React Testing Library

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   - Create a Firebase project
   - Enable Firestore
   - Copy `.env.example` to `.env.local` and add your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Set up Firestore data**:
   Create a document at `researchData/main` with the following structure:
   ```json
   {
     "audioUrl": "https://example.com/paranoid.mp3",
     "nodes": [
       { "id": "1", "label": "Black Sabbath", "group": 1 },
       { "id": "2", "label": "Heavy Metal", "group": 2 }
     ],
     "links": [
       { "source": "1", "target": "2", "strength": 0.8 }
     ],
     "waveRegions": [
       { "start": 0, "end": 30, "label": "Intro", "color": "#ff4500" }
     ],
     "timelineEvents": [
       { "time": "1970", "title": "Album Release", "description": "Paranoid album released" }
     ],
     "gameStats": [
       { "year": 2015, "game": "Helldivers", "playCount": 1200 }
     ]
   }
   ```

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── __tests__/      # Component tests
│   ├── InfluenceGraph.tsx
│   ├── Timeline.tsx
│   ├── RecordPlayer.tsx
│   └── GameStatsChart.tsx
├── lib/                # Utilities and configurations
│   ├── firebase.ts     # Firebase configuration
│   ├── types.ts        # TypeScript interfaces
│   ├── useResearchData.ts # Data fetching hook
│   └── utils.ts        # Utility functions
├── pages/              # Next.js pages
│   ├── _app.tsx        # App component
│   └── index.tsx       # Main page
└── styles/             # CSS styles
    └── globals.css     # Global styles with Tailwind
```

## Design Theme

The application uses a custom theme inspired by the Paranoid album cover:
- **Background**: Deep black (`#0a0a0a`)
- **Primary**: Bold orange (`#ff4500`)
- **Secondary**: White (`#ffffff`)
- **Accents**: Dark grays for depth

## Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**:
   ```bash
   firebase init hosting
   firebase deploy
   ```

## Testing

The project includes comprehensive tests for all components:
- Component rendering tests
- User interaction tests
- Error handling tests
- Accessibility tests

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 