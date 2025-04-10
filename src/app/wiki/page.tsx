'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function WikiPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const SectionHeading = ({ id, title }: { id: string; title: string }) => (
    <h2
      className="text-2xl font-bold text-gray-100 mt-8 cursor-pointer flex items-center"
      onClick={() => toggleSection(id)}
    >
      {title}
      <span className="ml-2 text-gray-400 text-xl">{activeSection === id ? '▼' : '▶'}</span>
    </h2>
  );

  return (
    <main className="container mx-auto px-4 py-8 pb-20">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-center mb-8">
          Minecraft Bingo Plugin - Official Wiki
        </h1>

        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <p className="text-center">
            This wiki provides documentation for the Minecraft Bingo plugin - a lockout minigame
            with specialized kits.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Home
            </Link>
            <Link href="/wiki/all-kits" className="text-blue-400 hover:text-blue-300">
              Kit Information
            </Link>
          </div>
        </div>

        <div className="space-y-2 bg-gray-800 p-4 rounded-lg mb-8">
          <h3 className="text-xl font-semibold">Table of Contents</h3>
          <ul className="space-y-1">
            <li>
              <a href="#what-is-bingo" className="text-blue-400 hover:text-blue-300">
                What is Bingo?
              </a>
            </li>
            <li>
              <a href="#how-to-play" className="text-blue-400 hover:text-blue-300">
                How to Play
              </a>
            </li>
            <li>
              <a href="#kits-overview" className="text-blue-400 hover:text-blue-300">
                Kits Overview
              </a>
            </li>
            <li>
              <a href="#available-kits" className="text-blue-400 hover:text-blue-300">
                Available Kits
              </a>
            </li>
            <li>
              <a href="#feasts" className="text-blue-400 hover:text-blue-300">
                Feasts and Mini-Feasts
              </a>
            </li>
            <li>
              <a href="#game-modes" className="text-blue-400 hover:text-blue-300">
                Game Modes
              </a>
            </li>
            <li>
              <a href="#commands" className="text-blue-400 hover:text-blue-300">
                Plugin Commands
              </a>
            </li>
            <li>
              <a href="#tips" className="text-blue-400 hover:text-blue-300">
                Tips for Success
              </a>
            </li>
            <li>
              <a href="#additional-info" className="text-blue-400 hover:text-blue-300">
                Additional Information
              </a>
            </li>
          </ul>
        </div>

        <section id="what-is-bingo">
          <SectionHeading id="what-is-bingo" title="🎮 What is Bingo?" />
          {(activeSection === 'what-is-bingo' || activeSection === null) && (
            <div className="mt-4">
              <p>
                Bingo is a lockout minigame with kits where players compete to complete tasks
                (quests) on a Minecraft bingo card. Each kit contains unique items and special
                abilities that get enhanced throughout the game.
              </p>
              <p className="mt-2">Match formats:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Team Mode</strong>: Two teams (Red vs Blue) compete to complete tasks
                  first
                </li>
                <li>
                  <strong>Solo Mode</strong>: Multiple players in a free-for-all format
                </li>
                <li>
                  <strong>Kit vs Non-Kit</strong>: Choose whether to enable special kits or play
                  vanilla
                </li>
                <li>
                  <strong>Ranked vs Casual</strong>: For team matches, choose between casual or
                  ranked matches
                </li>
              </ul>
            </div>
          )}
        </section>

        <section id="how-to-play">
          <SectionHeading id="how-to-play" title="🎲 How to Play" />
          {(activeSection === 'how-to-play' || activeSection === null) && (
            <div className="mt-4">
              <ol className="list-decimal pl-6">
                <li>Create a match with your preferred settings</li>
                <li>If kits are enabled, all players must choose a kit</li>
                <li>
                  Win conditions:
                  <ul className="list-disc pl-6 mt-2">
                    <li>
                      <strong>Team Mode</strong>: First team to complete 13 tasks wins
                    </li>
                    <li>
                      <strong>Solo Mode</strong>: Game ends when all tasks are completed; player
                      with most points wins
                    </li>
                  </ul>
                </li>
                <li>
                  Throughout the game, 3 mini feasts and 1 feast spawn at random map coordinates,
                  providing useful loot
                </li>
                <li>Each match has a unique map, which is deleted when the match ends</li>
              </ol>
            </div>
          )}
        </section>

        <section id="kits-overview">
          <SectionHeading id="kits-overview" title="🛠️ Kits Overview" />
          {(activeSection === 'kits-overview' || activeSection === null) && (
            <div className="mt-4">
              <p>
                Each kit provides unique abilities, items, and play styles. Kits receive buffs
                throughout the game, particularly after completing tasks.
              </p>
              <h3 className="text-xl font-semibold mt-4">Kit System Mechanics</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Start Kit</strong>: Initial items and abilities given when the game starts
                </li>
                <li>
                  <strong>Complete Kit</strong>: Enhanced abilities and items given after completing
                  tasks
                </li>
                <li>
                  <strong>Respawn</strong>: Kits are re-applied when a player respawns
                </li>
              </ul>
            </div>
          )}
        </section>

        <section id="available-kits">
          <SectionHeading id="available-kits" title="📋 Available Kits" />
          {activeSection === 'available-kits' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">🧭 Hunter</h3>
                <p>
                  <strong>Icon</strong>: Compass
                </p>
                <p>
                  <strong>Description</strong>: Use a compass to track down enemies!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>Start</strong>: Iron Sword with Sharpness II
                    </li>
                    <li>
                      <strong>Complete</strong>: Hunter&apos;s Compass that tracks the nearest enemy
                      player, Iron Sword upgraded to Sharpness V
                    </li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Right-click the compass to track the nearest enemy player</li>
                    <li>The compass points to the closest enemy in the same world</li>
                    <li>Enhanced combat capability with the powerful sword</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">🐢 Aquaman</h3>
                <p>
                  <strong>Icon</strong>: Turtle Helmet
                </p>
                <p>
                  <strong>Description</strong>: Breathe underwater, swim faster, and break blocks
                  quickly underwater!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Turtle Helmet with Respiration V and Aqua Affinity</li>
                    <li>Iron Boots with Depth Strider</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Permanent Dolphin&apos;s Grace effect for faster swimming</li>
                    <li>Extended underwater breathing</li>
                    <li>Faster mining underwater</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">⛏️ Miner</h3>
                <p>
                  <strong>Icon</strong>: Iron Pickaxe
                </p>
                <p>
                  <strong>Description</strong>: Break blocks and escape caves quickly!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Enchanted pickaxe for faster mining</li>
                    <li>Torches for cave exploration</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Increased mining speed</li>
                    <li>Ability to detect nearby ores</li>
                    <li>Enhanced night vision in caves</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">🍎 Survivor</h3>
                <p>
                  <strong>Icon</strong>: Golden Apple
                </p>
                <p>
                  <strong>Description</strong>: Protect yourself with armor and eat golden apples to
                  survive!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Protective armor</li>
                    <li>Golden apples for healing</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Enhanced regeneration</li>
                    <li>Damage reduction</li>
                    <li>Absorption hearts from consuming golden apples</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">🐔 Beastmaster</h3>
                <p>
                  <strong>Icon</strong>: Chicken Spawn Egg
                </p>
                <p>
                  <strong>Description</strong>: Use spawn eggs to summon animals!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Various animal spawn eggs</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Summoned animals help with various tasks</li>
                    <li>Special relationship with passive mobs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">👁️ Endermage</h3>
                <p>
                  <strong>Icon</strong>: Ender Eye
                </p>
                <p>
                  <strong>Description</strong>: Use your ender eyes and ender pearl to find the End!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Ender pearls for teleportation</li>
                    <li>Ender eyes for End portal tracking</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Enhanced enderman interactions</li>
                    <li>Efficient End portal location</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">💎 Raider</h3>
                <p>
                  <strong>Icon</strong>: Emerald
                </p>
                <p>
                  <strong>Description</strong>: Automatically start raids when entering villages!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Emeralds for trading</li>
                    <li>Raid-related equipment</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Automatic raid triggers in villages</li>
                    <li>Better deals with villagers</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">🐝 Beekeeper</h3>
                <p>
                  <strong>Icon</strong>: Bee Nest
                </p>
                <p>
                  <strong>Description</strong>: Create your own apiary!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Bee-related items</li>
                    <li>Honey bottles</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Control and breed bees more effectively</li>
                    <li>Create honey products more efficiently</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">🔥 Nether Explorer</h3>
                <p>
                  <strong>Icon</strong>: Netherrack
                </p>
                <p>
                  <strong>Description</strong>: Create Nether portals and find Nether structures
                  quickly!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Obsidian for portal creation</li>
                    <li>Fire starter items</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Resistance to lava and fire</li>
                    <li>Better navigation in the Nether</li>
                    <li>Enhanced ability to locate Nether structures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-300">❓ Surprise</h3>
                <p>
                  <strong>Icon</strong>: Name Tag
                </p>
                <p>
                  <strong>Description</strong>: Receive a random kit at the start of the match!
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Kit Contents:</p>
                  <ul className="list-disc pl-6">
                    <li>Random kit assignment</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Special Abilities:</p>
                  <ul className="list-disc pl-6">
                    <li>Adaptability to different gameplay styles</li>
                    <li>Element of surprise for opponents</li>
                  </ul>
                </div>
              </div>

              {/* More kits would continue in the same pattern */}
              <button
                className="col-span-1 md:col-span-2 bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                onClick={() => window.open('/wiki/all-kits', '_blank')}
              >
                View All 20 Kits →
              </button>
            </div>
          )}
          {activeSection !== 'available-kits' && (
            <div className="mt-4">
              <p>
                Click to view details on all 20 available kits including Hunter, Aquaman, Miner,
                Survivor, Beastmaster, and more.
              </p>
            </div>
          )}
        </section>

        <section id="feasts">
          <SectionHeading id="feasts" title="💫 Feasts and Mini-Feasts" />
          {(activeSection === 'feasts' || activeSection === null) && (
            <div className="mt-4">
              <p>Throughout the game, loot spawns at random coordinates:</p>

              <h3 className="text-xl font-semibold mt-4">Mini-Feasts</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>3 mini-feasts spawn during the match</li>
                <li>Contain mid-tier loot</li>
                <li>Help players progress through mid-game</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Main Feast</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>1 main feast spawns during the match</li>
                <li>Contains high-tier loot</li>
                <li>Strategic objective for teams</li>
              </ul>
            </div>
          )}
        </section>

        <section id="game-modes">
          <SectionHeading id="game-modes" title="🏆 Game Modes" />
          {(activeSection === 'game-modes' || activeSection === null) && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Team Mode</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>Two teams: Red and Blue</li>
                <li>First team to complete 13 tasks wins</li>
                <li>Team-based coordination and strategy</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Solo Mode (Free-for-All)</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>Multiple players compete individually</li>
                <li>Game ends when all tasks are completed</li>
                <li>Player with the most completed tasks wins</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Ranked vs Casual</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Ranked</strong>: Affects player rankings and stats
                </li>
                <li>
                  <strong>Casual</strong>: Practice mode with no ranking impact
                </li>
              </ul>
            </div>
          )}
        </section>

        <section id="commands">
          <SectionHeading id="commands" title="🔧 Plugin Commands" />
          {(activeSection === 'commands' || activeSection === null) && (
            <div className="mt-4">
              <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-4 border-b border-gray-700">Command</th>
                      <th className="text-left py-2 px-4 border-b border-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <code>/bingo</code>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">Main plugin command</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <code>/menu</code>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        Open the kit selection menu
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <code>/tc &lt;message&gt;</code>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        Team chat (Team Mode only)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <code>/ff</code>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        Forfeit the current match
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <code>/profile</code>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        View your player profile and stats
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section id="tips">
          <SectionHeading id="tips" title="🚀 Tips for Success" />
          {(activeSection === 'tips' || activeSection === null) && (
            <div className="mt-4">
              <ol className="list-decimal pl-6">
                <li>
                  <strong>Choose the right kit</strong> for your playstyle and the match type
                </li>
                <li>
                  <strong>Coordinate with teammates</strong> in Team Mode
                </li>
                <li>
                  <strong>Track feast timers</strong> to gain advantage from loot
                </li>
                <li>
                  <strong>Focus on your kit&apos;s strengths</strong> for task completion
                </li>
                <li>
                  <strong>Prioritize high-value tasks</strong> that align with your kit abilities
                </li>
                <li>
                  <strong>Keep an eye on enemy progress</strong> to block key tasks
                </li>
              </ol>
            </div>
          )}
        </section>

        <section id="additional-info">
          <SectionHeading id="additional-info" title="📋 Additional Information" />
          {(activeSection === 'additional-info' || activeSection === null) && (
            <div className="mt-4">
              <ul className="list-disc pl-6">
                <li>Maps are unique for each match and deleted afterward</li>
                <li>Player stats and rankings are tracked for Ranked matches</li>
                <li>Kit abilities scale throughout the game, becoming more powerful</li>
                <li>Strategic kit selection can counter enemy kits</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Technical Information</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>Plugin developed for Minecraft 1.21.4</li>
                <li>Development started in June 2023</li>
                <li>Compatible with Spigot/Paper servers</li>
              </ul>

              <div className="mt-6 border-t border-gray-700 pt-4">
                <p className="text-center text-gray-400">
                  This Wiki page provides an overview of the Minecraft Bingo plugin and its
                  features. For more detailed information or specific questions, please contact the
                  server administrators.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
