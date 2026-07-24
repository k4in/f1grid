import type { Team, TeamId, Teams } from "@/types/types";

export type TeamRecord = Team & { id: TeamId };

/** Fixed display order from the product brief. */
export const teams: TeamRecord[] = [
  {
    id: "mclaren",
    shortName: "McLaren",
    fullName: "McLaren Mastercard F1 Team",
    teamColor: "#FF8000",
  },
  {
    id: "mercedes",
    shortName: "Mercedes",
    fullName: "Mercedes-AMG Petronas F1 Team",
    teamColor: "#27F4D2",
  },
  {
    id: "red-bull",
    shortName: "Red Bull",
    fullName: "Oracle Red Bull Racing",
    teamColor: "#3671C6",
  },
  {
    id: "ferrari",
    shortName: "Ferrari",
    fullName: "Scuderia Ferrari HP",
    teamColor: "#E8002D",
  },
  {
    id: "williams",
    shortName: "Williams",
    fullName: "Atlassian Williams F1 Team",
    teamColor: "#64C4FF",
  },
  {
    id: "racing-bulls",
    shortName: "Racing Bulls",
    fullName: "Visa Cash App Racing Bulls F1 Team",
    teamColor: "#6692FF",
  },
  {
    id: "aston-martin",
    shortName: "Aston Martin",
    fullName: "Aston Martin Aramco F1 Team",
    teamColor: "#229971",
  },
  {
    id: "haas",
    shortName: "Haas",
    fullName: "TGR Haas F1 Team",
    teamColor: "#B6BABD",
  },
  {
    id: "audi",
    shortName: "Audi",
    fullName: "Audi Revolut F1 Team",
    teamColor: "#F50537",
  },
  {
    id: "alpine",
    shortName: "Alpine",
    fullName: "BWT Alpine F1 Team",
    teamColor: "#FF87BC",
  },
  {
    id: "cadillac",
    shortName: "Cadillac",
    fullName: "Cadillac Formula 1 Team",
    teamColor: "#C4A962",
  },
];

export const teamById = Object.fromEntries(
  teams.map((team) => [team.id, team]),
) as Record<TeamId, TeamRecord>;

export const TEAM_IDS = teams.map((team) => team.id);

/** Keep catalog type export usable if needed elsewhere. */
export type { Teams };
