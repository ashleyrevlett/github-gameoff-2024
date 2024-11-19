# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


# Architecture

Stores may communicate with each other.

Structure:
src/: Main application folder.
  assets/: Images, fonts, global styles.
  components/: Reusable, atomic components (buttons, modals, etc.).
  composables/: Reusable logic with custom hooks using Vue's Composition API.
  layouts/: Layouts that wrap your screens (e.g., header, footer).
  store/: Pinia stores, separated by feature (e.g., authStore.js, userStore.js).
  views/: Page-level components for routing, typically one per route.
  router/: Router configuration and route definitions.
  utils/: Helper functions, constants, etc.

Naming Conventions:
  Use PascalCase for component and view names.
  Use kebab-case for filenames and folders.
  File-Specific Best Practices:

Scoped CSS in components for local styles.
Feature-Based Folders in store/, composables/, and components/ if features have dedicated logic.

# Context

A text-based diplomacy-heavy rpg game game in vue3.

The player is a doomsday cult leader who believes they have communed with an alien god and seen the true reality of the universe. you believe a comet is coming to cause doomsday but you will be rescued by the savior Xenu when the comet arrives. your cult takes drugs and performs minor sacrifices. it gets darker the more it grows. you believe in your own unified theory of everything where the world is a simulation of xenu's consciouness.

The player stats are "favor" (affects how likely they are to attract followers each turn), "faith" (how much faith followers have in you), and "scrutiny" (how closely the government is investigating you. Player resources include money (dollars).

Each stat ranges -100 to 100. If you hit +100 scrutiny or -100 favor you lose. When the doomsday countdown clock goes off (in 30 days) the game ends, and your score is based on your follower count and money.

Each time you hit +100 in favor or faith you gain a level.

The game uses an over-top-top dark tone and outrageously heretical writing. It's set in the 1960s.

Give me a list of 10 events that may occur during the cult leader's reign, from inception to doomsday. Each event should have a title, brief description, and outcome where its effect on the player's stats and resources is indicated. for each event also include a list of conditions necessary for the event to apply, ex., level > 2, or money < 100.

Events should be structured so they can give the player a balanced, winnable game as they occur.

# Progression

## Attributes

1. Favor
  - _Action_: Pray, +1 favor
  - Level 0: unlocked
  - Level 1: 1 follower, **faith** unlocks
  - Level 2: random blessing

2. Faith
  - _Action_: Preach, +1 faith
  - Level 1: 1 follower, **love** unlocks
  - Level 2: +.01 favor growth rate per second

3. Love (Bless)
  - _Action_: Bless, +1 love
  - Level 1: **money** unlocks
  - Level 2: +.01 money growth rate per second

## Resources

- Money
  - _Action_: Tithe, + $1.00 * (faith + love) * follower count, costs X% of faith + love
  - no levels, no limit
  - spend money to buy buildings, bribes

- Followers
  - No action, level = population cap
  ?- each follower generates $0.01 money/second, .01 faith/second, .01 love/second
  ?- each follower costs...

- Pray starts off unlocked and increases "favor".
- When favor reaches level 2, Ka blesses you with a follower and "faith"/preach unlocks.
  - Leveling favor to 3+ grants additional blessings:
    - Favor 3: follower gains +.01 growth rate per second.
    - Favor 4: follower gains +.1 growth rate per second.
    - Favor 5: follower gains +1 growth rate per second.
- Leveling followers to 3 unlocks money and starts rate of $0.01 money/second.
- Leveling faith to 2 unlocks "love" resource.
  - Leveling faith to 3+ unlocks:
    - +10% follower growth rate per second.
    - +10% money growth rate per second.

-----

Or maybe generation is sole responsibilty of buildings.
And each attribute level unlocks new buildings.


## Progression

Spend favor to perform miracles, boost faith.
Spend faith to gain followers, money.
Spend money to gain buildings (that boost favor, faith, followers).


1. Attribute: Favor (starts unlocked)
  - _Action_: Pray, +1 favor
  - Level 1: **faith** unlocks, +1 follower
  - Level 2: Things to gain favor - Idol, statue, shrine, monument
  - What costs favor? Some choices

2. Attribute: Faith
  - _Action_: Preach, +1 faith
  - Level 1: **followers** unlocks, 1 follower
  - Level 2+:
    - Things to boost faith that cost money - Altar, temple, rituals, miracles
    - Annoiting **priests**
  - What costs faith? Some choices

3. Resource: Followers
  - _Action_: Recruit, +1 follower, costs faith
  - level = population cap
  - per second, each follower generates .01 money, .01 favor ?
  - What costs followers?

4. Resource: Priests
  - _Action_: Annoit, +1 priest, costs 1 follower + money
  - generates +.01 follower growth rate per second
  - no levels, population cap = # temples

4. Resource: Money
  - _Action_: Tithe (costs faith)
  - no level, no limit
  - per second, each follower generates $1.00 * (faith + love)
  - What costs money? Any building

5. Resource: Buildings
  - _Action_: Build, +1 building, costs money


Other actions:
- Tithe
- Perform Miracle
- Bless