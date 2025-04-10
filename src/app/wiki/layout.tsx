import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minecraft Bingo Wiki - Official Documentation',
  description: 'Official wiki for the Minecraft Bingo plugin featuring game modes, kit information, commands, and gameplay tips.',
};

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 