# Minecraft Bingo

A real-time multiplayer web application for playing Minecraft Bingo matches. Teams compete to complete Minecraft-related quests in a race format.

## Features

- Real-time game state updates
- Two-team competition (Red vs Blue)
- Quest completion tracking
- Player attribution for completed quests
- Automatic winner determination
- Game history tracking
- Responsive grid layout
- Dark mode UI

## Tech Stack

- **Framework**: Next.js 15.2
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **Data Storage**: File-based JSON storage
- **Real-time Updates**: Polling-based updates

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd minecraft-bingo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions and game storage logic
- `/data` - JSON file-based game storage

## Game Rules

1. Two teams compete: Red and Blue
2. Each game has 25 Minecraft-related quests
3. Teams race to complete quests first
4. Winner is determined by:
   - Most completed quests, or
   - First to complete their last quest (in case of a tie)

## Development

- Run tests: `npm test`
- Lint code: `npm run lint`
- Build for production: `npm run build`
- Start production server: `npm start`

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000  # For development
# Use your Vercel URL in production, e.g.:
# NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

## Deployment

This project is configured for easy deployment with Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

Vercel will automatically:
- Deploy when you push to main
- Create preview deployments for pull requests
- Handle HTTPS and domain configuration

To deploy manually:
```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details
