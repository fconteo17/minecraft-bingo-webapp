import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Games - Minecraft Bingo',
  description: 'Watch and participate in live Minecraft Bingo games. See real-time updates of ongoing matches and game history.',
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 