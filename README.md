# Minecraft Bingo

[![Next.js](https://img.shields.io/badge/Next.js-15.2-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat&logo=vercel)](https://vercel.com)

A real-time multiplayer web application for playing Minecraft Bingo matches. Teams compete to complete Minecraft-related quests in a race format.

## ✨ Features

- Real-time game state updates
- Multiple game modes:
  - Two-team competition (Red vs Blue)
  - Solo mode (free-for-all with multiple players)
- Quest completion tracking
- Player attribution for completed quests
- Automatic winner determination
- Game history tracking
- Responsive grid layout
- Dark mode UI
- API documentation with Swagger UI

## 🚀 Tech Stack

- **Framework**: [Next.js 15.2](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: React Hooks
- **Data Storage**: File-based JSON storage
- **Real-time Updates**: Polling-based updates
- **API Documentation**: Swagger/OpenAPI 3.0.0

## 🛠️ Getting Started

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

## 📁 Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions and game storage logic

## 🎮 Game Rules

### Team Mode
1. Two teams compete: Red and Blue
2. Each game has 25 Minecraft-related quests
3. Teams race to complete quests first
4. Winner is determined by:
   - Most completed quests, or
   - First to complete their last quest (in case of a tie)

### Solo Mode
1. Multiple players compete in a free-for-all format
2. Each game has 25 Minecraft-related quests
3. Players race to complete quests first
4. Winner is the player who:
   - Completes the most quests, or
   - Is the first to complete their last quest (in case of a tie)

## 🌐 API Documentation

The application includes full API documentation using Swagger/OpenAPI 3.0.0. You can access the API documentation at:

- Development: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Production: [https://minecraft-bingo-webapp.vercel.app/api-docs](https://minecraft-bingo-webapp.vercel.app/api-docs)

The API supports:
- Creating new games (Teams or Solo mode)
- Retrieving game details
- Completing quests
- Updating quest information
- Ending games
- Retrieving game history

## 💻 Development

- Run tests: `npm test`
- Lint code: `npm run lint`
- Build for production: `npm run build`
- Start production server: `npm start`

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000  # For development
# Use your Vercel URL in production, e.g.:
# NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

## 🚢 Deployment

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details
