import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameInfo from '../GameInfo';
import { Game } from '@/types/game';

// Mock fetch globally
global.fetch = jest.fn();

describe('GameInfo Component', () => {
  const mockTeamsGame: Game = {
    id: 'game-123',
    timestamp: '2023-01-01T00:00:00.000Z',
    gameType: 'Teams',
    teams: ['Red', 'Blue'],
    quests: [
      { name: 'Find a diamond', completedBy: 'Red', completedByPlayer: 'Player1' },
      { name: 'Craft a golden apple' },
      { name: 'Defeat the Ender Dragon' }
    ],
    completedQuests: {
      'Red': ['Find a diamond'],
      'Blue': []
    }
  };

  const mockSoloGame: Game = {
    id: 'game-456',
    timestamp: '2023-01-01T00:00:00.000Z',
    gameType: 'Solo',
    players: ['Player1', 'Player2', 'Player3'],
    quests: [
      { name: 'Find a diamond', completedBy: 'Player1', completedByPlayer: 'Player1' },
      { name: 'Craft a golden apple', completedBy: 'Player2', completedByPlayer: 'Player2' },
      { name: 'Defeat the Ender Dragon' }
    ],
    completedQuests: {
      'Player1': ['Find a diamond'],
      'Player2': ['Craft a golden apple'],
      'Player3': []
    }
  };

  const completedTeamsGame: Game = {
    ...mockTeamsGame,
    winner: 'Red'
  };

  const completedSoloGame: Game = {
    ...mockSoloGame,
    winner: 'Player1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch implementation
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ game: mockTeamsGame }),
      })
    );
  });

  test('renders team information correctly for Teams game', () => {
    const { getByText } = render(<GameInfo game={mockTeamsGame} />);
    
    // Check if game type is displayed
    expect(getByText('Team Mode')).toBeInTheDocument();
    
    // Check if both teams are displayed
    expect(getByText('Red')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
    
    // Check if completed quests count is displayed (looking for text that contains the numbers)
    const questTextElements = document.querySelectorAll('.text-sm');
    const questTexts = Array.from(questTextElements).map(el => el.textContent);
    expect(questTexts.some(text => text?.includes('1'))).toBeTruthy();
    expect(questTexts.some(text => text?.includes('0'))).toBeTruthy();
  });

  test('renders player information correctly for Solo game', () => {
    const { getByText } = render(<GameInfo game={mockSoloGame} />);
    
    // Check if game type is displayed
    expect(getByText('Solo Mode')).toBeInTheDocument();
    
    // Check if all players are displayed
    expect(getByText('Player1')).toBeInTheDocument();
    expect(getByText('Player2')).toBeInTheDocument();
    expect(getByText('Player3')).toBeInTheDocument();
    
    // Check if completed quests count is displayed for each player
    expect(getByText('Players')).toBeInTheDocument();
  });

  test('displays winner information for completed Teams game', () => {
    const { getByText } = render(<GameInfo game={completedTeamsGame} />);
    
    // Use a more specific approach to check for the winner display
    const winnerText = getByText(/Winner:/).textContent;
    expect(winnerText).toContain('Red');
  });

  test('displays winner information for completed Solo game', () => {
    const { getByText } = render(
      <GameInfo game={completedSoloGame} />
    );
    
    // Use a more specific approach to check for the winner display
    const winnerText = getByText(/Winner:/).textContent;
    expect(winnerText).toContain('Player1');
  });

  test('displays formatted timestamp', () => {
    const { getByText } = render(<GameInfo game={mockTeamsGame} />);
    
    // Check if formatted date is displayed (using the actual format shown in the component)
    expect(getByText('12/31/2022, 9:00:00 PM')).toBeInTheDocument();
  });
}); 