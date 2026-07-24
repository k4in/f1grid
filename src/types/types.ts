export type DriverStatusState = "contract" | "current" | "junior" | "previous";

export type DriverStatus = {
  state: DriverStatusState;
  /**
   * Full calendar year the current stint / contract started, e.g. "2026".
   * Typically set for "contract" and "current"; null for junior/previous or unknown.
   */
  since: string | null;
};

export type Driver = {
  firstname: string;
  lastname: string;
  birthday: string;
  countryCode: string;
  status: DriverStatus;
};

export type Team = {
  shortName: string;
  fullName: string;
  teamColor: string;
};

export type Drivers = Driver[];
export type Teams = Team[];

/** Runtime-only stable id (slug). Not stored on catalog objects. */
export type DriverId = string;

export type PoolId = "junior" | "outOfContract" | "outNextSeason";

export type TeamId =
  | "mclaren"
  | "mercedes"
  | "red-bull"
  | "ferrari"
  | "williams"
  | "racing-bulls"
  | "aston-martin"
  | "haas"
  | "audi"
  | "alpine"
  | "cadillac";

export type ContainerId = TeamId | PoolId;

export type Assignments = Record<ContainerId, DriverId[]>;

export type Grid = {
  id: string;
  label: string;
  isDefault: boolean;
  assignments: Assignments;
};

export type GridExportPayload = {
  v: 1;
  assignments: Assignments;
};

export type GridStoreState = {
  activeGridId: string;
  grids: Record<string, Grid>;
};
