const publicMeltdownEvent = {
  id: "public_meltdown",
  title: "Public Meltdown!",
  description: "After a grueling week, your star is seen snapping at fans or paparazzi in public.",
  conditions: (playerState) => playerState.stress > 50,
  choices: [
    {
      id: "apologize",
      label: "Issue an Apology",
      description: "You issue a public apology for their behavior, and allow them to take some time off.",
      outcome: () => {
        return {
          reputation: 10,
          popularity: -5,
          stress: -10
        }
      }
    },
    {
      id: "ignore",
      label: "Ignore It",
      description: "You ignore the incident and hope it will blow over.",
      outcome: () => {
        return {
          reputation: Math.random() > 0.5 ? -10 : 0,
        }
      }
    },
  ],
};

export default publicMeltdownEvent;