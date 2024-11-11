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

The player stats are "charisma" (affects how likely they are to attract followers each turn), "faith" (how much faith followers have in you), and "scrutiny" (how closely the government is investigating you. Player resources include money (dollars).

Each stat ranges -100 to 100. If you hit +100 scrutiny or -100 charisma you lose. When the doomsday countdown clock goes off (in 30 days) the game ends, and your score is based on your follower count and money.

Each time you hit +100 in charisma or faith you gain a level.

The game uses an over-top-top dark tone and outrageously heretical writing. It's set in the 1960s.

Give me a list of 10 events that may occur during the cult leader's reign, from inception to doomsday. Each event should have a title, brief description, and outcome where its effect on the player's stats and resources is indicated. for each event also include a list of conditions necessary for the event to apply, ex., level > 2, or money < 100.

Events should be structured so they can give the player a balanced, winnable game as they occur.
