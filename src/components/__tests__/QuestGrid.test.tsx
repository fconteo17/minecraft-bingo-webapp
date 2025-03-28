import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import QuestGrid from '../QuestGrid';
import { Quest, Game } from '@/types/game';

// Mock fetch globally
global.fetch = jest.fn();

describe('QuestGrid Component', () => {
  const mockQuests: Quest[] = [
    { name: 'Find a diamond' },
    { name: 'Craft a golden apple' },
    { name: 'Defeat the Ender Dragon', completedBy: 'Red', completedByPlayer: 'Player1', completedAt: '2023-01-01T00:00:00.000Z' },
    { name: 'Build a house', completedBy: 'Blue', completedByPlayer: 'Player2', completedAt: '2023-01-01T00:00:00.000Z' },
    { name: 'Collect 64 coal' },
  ];

  const defaultProps = {
    quests: mockQuests,
    gameId: 'game-123',
    gameType: 'Teams' as Game['gameType'],
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch implementation
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ quests: mockQuests }),
      })
    );
  });

  test('renders all quests with correct styling', () => {
    render(<QuestGrid {...defaultProps} />);
    
    // Verify all quest names are rendered
    expect(screen.getByText('Find a diamond')).toBeInTheDocument();
    expect(screen.getByText('Craft a golden apple')).toBeInTheDocument();
    expect(screen.getByText('Defeat the Ender Dragon')).toBeInTheDocument();
    expect(screen.getByText('Build a house')).toBeInTheDocument();
    expect(screen.getByText('Collect 64 coal')).toBeInTheDocument();
    
    // Check if completed quests show the correct team and player information
    expect(screen.getByText('By: Player1')).toBeInTheDocument();
    expect(screen.getByText('Team: Red')).toBeInTheDocument();
    expect(screen.getByText('By: Player2')).toBeInTheDocument();
    expect(screen.getByText('Team: Blue')).toBeInTheDocument();
  });

  test('allows editing quest name on double click', async () => {
    const user = userEvent.setup();
    render(<QuestGrid {...defaultProps} />);
    
    // Double click on a quest to edit
    const questElement = screen.getByText('Find a diamond');
    await user.dblClick(questElement);
    
    // Check if input field appears with current quest name
    const inputElement = screen.getByDisplayValue('Find a diamond');
    expect(inputElement).toBeInTheDocument();
    
    // Change the quest name
    await user.clear(inputElement);
    await user.type(inputElement, 'Find 3 diamonds');
    
    // Submit the form by pressing Enter
    await user.keyboard('{Enter}');
    
    // Check if fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/games/game-123/updateQuest',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: 'game-123',
          questName: 'Find a diamond',
          newQuestName: 'Find 3 diamonds'
        })
      })
    );
  });

  test('displays team colors correctly for Teams game type', () => {
    render(<QuestGrid {...defaultProps} />);
    
    // Get all quest containers
    const questContainers = document.querySelectorAll('.p-3.rounded-lg.border');
    
    // Find the Red team quest
    const redTeamQuest = Array.from(questContainers).find(
      container => container.textContent?.includes('Defeat the Ender Dragon')
    );
    
    // Find the Blue team quest
    const blueTeamQuest = Array.from(questContainers).find(
      container => container.textContent?.includes('Build a house')
    );
    
    // Check if the containers have the correct color classes
    expect(redTeamQuest?.className).toContain('bg-red-900/50');
    expect(redTeamQuest?.className).toContain('border-red-600');
    expect(blueTeamQuest?.className).toContain('bg-blue-900/50');
    expect(blueTeamQuest?.className).toContain('border-blue-600');
  });

  test('fetches game state at regular intervals', async () => {
    jest.useFakeTimers();
    
    // Clear the mock calls counter
    jest.clearAllMocks();
    
    // Use act for component rendering
    await act(async () => {
      render(<QuestGrid {...defaultProps} />);
      // Need to wait for any pending promises to resolve
      await Promise.resolve();
    });
    
    // The component doesn't explicitly fetch on mount, but sets up an interval
    // so let's verify no initial fetch has been called
    expect(global.fetch).toHaveBeenCalledTimes(0);
    
    // Advance timers to trigger the first interval
    await act(async () => {
      jest.advanceTimersByTime(2000);
      // Need to wait for any pending promises to resolve
      await Promise.resolve();
    });
    
    // Check that fetch was called once after the first interval
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`/api/games/game-123`);
    
    // Advance timers again
    await act(async () => {
      jest.advanceTimersByTime(2000);
      // Need to wait for any pending promises to resolve
      await Promise.resolve();
    });
    
    // Check that fetch was called again
    expect(global.fetch).toHaveBeenCalledTimes(2);
    
    // Clean up timers
    jest.useRealTimers();
  });

  test('displays solo player colors correctly', () => {
    const soloProps = {
      ...defaultProps,
      gameType: 'Solo' as Game['gameType'],
      players: ['Player1', 'Player2', 'Player3'],
      quests: [
        { name: 'Find a diamond', completedBy: 'Player1', completedByPlayer: 'Player1' },
        { name: 'Craft a golden apple', completedBy: 'Player2', completedByPlayer: 'Player2' },
        { name: 'Defeat the Ender Dragon' },
        { name: 'Build a house' },
        { name: 'Collect 64 coal', completedBy: 'Player3', completedByPlayer: 'Player3' },
      ],
    };
    
    render(<QuestGrid {...soloProps} />);
    
    // Get all quest containers
    const questContainers = document.querySelectorAll('.p-3.rounded-lg.border');
    
    // Find Player1's quest
    const player1Quest = Array.from(questContainers).find(
      container => container.textContent?.includes('Find a diamond')
    );
    
    // Find Player2's quest
    const player2Quest = Array.from(questContainers).find(
      container => container.textContent?.includes('Craft a golden apple')
    );
    
    // Find Player3's quest
    const player3Quest = Array.from(questContainers).find(
      container => container.textContent?.includes('Collect 64 coal')
    );
    
    // Check if quests have different color styles (exact colors aren't important)
    expect(player1Quest?.className).not.toBe(player2Quest?.className);
    expect(player1Quest?.className).not.toBe(player3Quest?.className);
    expect(player2Quest?.className).not.toBe(player3Quest?.className);
  });

  test('highlights the winner with green color', () => {
    const winnerProps = {
      ...defaultProps,
      gameType: 'Solo' as Game['gameType'],
      players: ['Player1', 'Player2', 'Player3'],
      winner: 'Player1',
      quests: [
        { name: 'Find a diamond', completedBy: 'Player1', completedByPlayer: 'Player1' },
        { name: 'Craft a golden apple', completedBy: 'Player2', completedByPlayer: 'Player2' },
        { name: 'Collect 64 coal', completedBy: 'Player3', completedByPlayer: 'Player3' },
      ],
    };
    
    render(<QuestGrid {...winnerProps} />);
    
    // Get all quest containers
    const questContainers = document.querySelectorAll('.p-3.rounded-lg.border');
    
    // Find the winner's quest
    const winnerQuest = Array.from(questContainers).find(
      container => container.textContent?.includes('Find a diamond')
    );
    
    // Check if winner quest has the winner color
    expect(winnerQuest?.className).toContain('bg-green-900/50');
    expect(winnerQuest?.className).toContain('border-green-600');
  });
}); 