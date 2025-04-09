'use client';
import Link from 'next/link';

export default function AllKitsPage() {
  return (
    <main className="container mx-auto px-4 py-8 pb-20">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-center mb-8">All Bingo Kits</h1>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <p className="text-center">
            Complete information about all 20 kits available in the Minecraft Bingo plugin
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link href="/wiki" className="text-blue-400 hover:text-blue-300">
              ← Back to Wiki
            </Link>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Home
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hunter */}
          <div id="hunter" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🧭 Hunter</h2>
            <p><strong>Icon</strong>: Compass</p>
            <p><strong>Description</strong>: Use a compass to track down enemies!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li><strong>Start</strong>: Iron Sword with Sharpness II</li>
                <li><strong>Complete</strong>: Hunter&apos;s Compass that tracks the nearest enemy player, Iron Sword upgraded to Sharpness V</li>
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

          {/* Aquaman */}
          <div id="aquaman" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🐢 Aquaman</h2>
            <p><strong>Icon</strong>: Turtle Helmet</p>
            <p><strong>Description</strong>: Breathe underwater, swim faster, and break blocks quickly underwater!</p>
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

          {/* Miner */}
          <div id="miner" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">⛏️ Miner</h2>
            <p><strong>Icon</strong>: Iron Pickaxe</p>
            <p><strong>Description</strong>: Break blocks and escape caves quickly!</p>
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

          {/* Survivor */}
          <div id="survivor" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🍎 Survivor</h2>
            <p><strong>Icon</strong>: Golden Apple</p>
            <p><strong>Description</strong>: Protect yourself with armor and eat golden apples to survive!</p>
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

          {/* Beastmaster */}
          <div id="beastmaster" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🐔 Beastmaster</h2>
            <p><strong>Icon</strong>: Chicken Spawn Egg</p>
            <p><strong>Description</strong>: Use spawn eggs to summon animals!</p>
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

          {/* Endermage */}
          <div id="endermage" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">👁️ Endermage</h2>
            <p><strong>Icon</strong>: Ender Eye</p>
            <p><strong>Description</strong>: Use your ender eyes and ender pearl to find the End!</p>
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

          {/* Raider */}
          <div id="raider" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">💎 Raider</h2>
            <p><strong>Icon</strong>: Emerald</p>
            <p><strong>Description</strong>: Automatically start raids when entering villages!</p>
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

          {/* Beekeeper */}
          <div id="beekeeper" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🐝 Beekeeper</h2>
            <p><strong>Icon</strong>: Bee Nest</p>
            <p><strong>Description</strong>: Create your own apiary!</p>
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

          {/* Nether Explorer */}
          <div id="nether-explorer" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🔥 Nether Explorer</h2>
            <p><strong>Icon</strong>: Netherrack</p>
            <p><strong>Description</strong>: Create Nether portals and find Nether structures quickly!</p>
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

          {/* Surprise */}
          <div id="surprise" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">❓ Surprise</h2>
            <p><strong>Icon</strong>: Name Tag</p>
            <p><strong>Description</strong>: Receive a random kit at the start of the match!</p>
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

          {/* Gambler */}
          <div id="gambler" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🥇 Gambler</h2>
            <p><strong>Icon</strong>: Gold Ingot</p>
            <p><strong>Description</strong>: After 5 minutes, choose between 3 random kits!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Initial basic items</li>
                <li>Choice of three random kits after 5 minutes</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Strategic kit selection based on match progress</li>
                <li>Adaptability to the current game situation</li>
              </ul>
            </div>
          </div>

          {/* Necromancer */}
          <div id="necromancer" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🔮 Necromancer</h2>
            <p><strong>Icon</strong>: Netherite Hoe</p>
            <p><strong>Description</strong>: Use your scythe to summon mobs on your enemies!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Netherite Hoe (Scythe)</li>
                <li>Mob summoning abilities</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Summon hostile mobs to attack enemies</li>
                <li>Control undead mobs more effectively</li>
              </ul>
            </div>
          </div>

          {/* Fisherman */}
          <div id="fisherman" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🎣 Fisherman</h2>
            <p><strong>Icon</strong>: Fishing Rod</p>
            <p><strong>Description</strong>: Fish quickly and collect water treasures!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Enchanted fishing rod</li>
                <li>Water-related items</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Faster fishing times</li>
                <li>Better fishing loot</li>
                <li>Enhanced water navigation</li>
              </ul>
            </div>
          </div>

          {/* Pão (Support) */}
          <div id="pao" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🍞 Pão (Support)</h2>
            <p><strong>Icon</strong>: Bread</p>
            <p><strong>Description</strong>: Help your team by feeding and healing them!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Food items for team healing</li>
                <li>Support items</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Team healing</li>
                <li>Food-based buffs for teammates</li>
                <li>Support role capabilities</li>
              </ul>
            </div>
          </div>

          {/* Scout */}
          <div id="scout" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🪶 Scout</h2>
            <p><strong>Icon</strong>: Feather</p>
            <p><strong>Description</strong>: Use your boost to run fast!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Speed-enhancing items</li>
                <li>Exploration tools</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Temporary speed boosts</li>
                <li>Enhanced map exploration capabilities</li>
                <li>Quick escapes from danger</li>
              </ul>
            </div>
          </div>

          {/* Checkpoint */}
          <div id="checkpoint" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🚩 Checkpoint</h2>
            <p><strong>Icon</strong>: Nether Brick Fence</p>
            <p><strong>Description</strong>: Use your checkpoint to return to a specific location!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Checkpoint marker item</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Set and teleport to checkpoints</li>
                <li>Efficient travel across the map</li>
              </ul>
            </div>
          </div>

          {/* Joker */}
          <div id="joker" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🃏 Joker</h2>
            <p><strong>Icon</strong>: Tropical Fish</p>
            <p><strong>Description</strong>: Use your Joker to shuffle the inventory of your enemies!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Joker special item</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Shuffle enemies&apos; inventories</li>
                <li>Cause confusion in enemy teams</li>
                <li>Disrupt enemy strategies</li>
              </ul>
            </div>
          </div>

          {/* Architect */}
          <div id="architect" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🧱 Architect</h2>
            <p><strong>Icon</strong>: Shulker Shell</p>
            <p><strong>Description</strong>: Use your Builder to construct quickly!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Building materials</li>
                <li>Quick placement tools</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Enhanced building capabilities</li>
                <li>Faster block placement</li>
                <li>Access to unique building techniques</li>
              </ul>
            </div>
          </div>

          {/* Sedex */}
          <div id="sedex" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">📦 Sedex</h2>
            <p><strong>Icon</strong>: Chest</p>
            <p><strong>Description</strong>: Use your Sedex to get items from your allies!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Sedex delivery system</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Share items with teammates remotely</li>
                <li>Collect items from teammates</li>
                <li>Enhanced team resource management</li>
              </ul>
            </div>
          </div>

          {/* Cultivator */}
          <div id="cultivator" className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-300">🌱 Cultivator</h2>
            <p><strong>Icon</strong>: Wheat</p>
            <p><strong>Description</strong>: Hold your hoe to make plants grow quickly!</p>
            <div className="mt-2">
              <p className="font-semibold">Kit Contents:</p>
              <ul className="list-disc pl-6">
                <li>Farming tools</li>
                <li>Crop seeds</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Special Abilities:</p>
              <ul className="list-disc pl-6">
                <li>Accelerate crop growth</li>
                <li>Enhanced farming capabilities</li>
                <li>Better crop yields</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/wiki" className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded">
            ← Back to Wiki
          </Link>
        </div>
      </div>
    </main>
  );
} 