const tabloidScandalEvent = {
  id: "tabloid_scandal",
  title: "Tabloid Scandal!",
  description: "A scandalous tabloid story has emerged!",
  conditions: (playerState) => playerState.popularity > 50,
  choices: [
    {
      id: "deny",
      label: "Deny Everything",
      description: "You deny the allegations and say they are false.",
      outcome: () => {
        return {
          reputation: 10,
          stress: 5
        }
      }
    },
    {
      id: "lean_into_it",
      label: "Lean Into It",
      description: "You embrace the scandal and use it to your advantage.",
      outcome: () => {
        return {
          popularity: 20,
          reputation: -5,
        }
      }
    },
  ],
};

export default tabloidScandalEvent;