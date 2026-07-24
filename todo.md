# F1 Grid

Desktop app for building hypothetical next-season Formula 1 grids by dragging drivers between teams and free-agent pools.

## Overview

- Drag and drop drivers freely between team containers and category pools
- Persist grid state in `localStorage` via Zustand
- Support multiple named grids (default + user-created/imported)
- Import / export the **active** grid as a plain string (no extra encode libraries)
- Single page, desktop only, use the full viewport (no mobile layout)

## Stack

- React + Vite + TypeScript
- Tailwind + shadcn/ui
- Zustand (state + `localStorage` persist)
- `@dnd-kit/dom` (drag and drop)
- `date-fns` (age display)
- flagcdn.com (country flags via ISO country code)

## Data model

### Catalog (static, `src/data`)

Immutable reference data only:

- **Teams** — `shortName`, `fullName`, `teamColor`
- **Drivers** — `firstname`, `lastname`, `birthday`, `countryCode`, `status`

Driver `status` is **display-only** on the card. It is **not** tied to DnD placement or pool membership.

| Status   | Card color (suggested) |
| -------- | ---------------------- |
| contract | green                  |
| current  | orange                 |
| junior   | blue                   |
| previous | violet                 |

`since` / `until` exist on status but are **deferred** — do not surface in the UI yet.

### Runtime IDs

- Do **not** put ids on catalog objects
- Assign stable ids in app state (e.g. slug from name) for DnD, assignments, and import/export

### Grid state (dynamic)

Each grid is a freeform assignment of driver ids into containers:

- **11 team containers** (unordered stacks, no seat limit)
- **3 category pools**
  - Junior drivers
  - Out of contract (previous / free agents)
  - Out next season

Driver status and category pools are independent:

- Status = badge chrome on the driver card
- Pool/team = where the user placed the driver

### Multi-grid store (conceptual)

```
{
  activeGridId: string
  grids: {
    [id]: {
      id: string
      label: string
      isDefault: boolean
      assignments: {
        // team shortName or pool key → driverId[]
        [containerId: string]: string[]
      }
    }
  }
}
```

## Teams

Drop containers only (no seat slots). Fixed order:

1. McLaren  
2. Mercedes  
3. Red Bull  
4. Ferrari  
5. Williams  
6. Racing Bulls  
7. Aston Martin  
8. Haas  
9. Audi  
10. Alpine  
11. Cadillac  

Containers use each team’s `teamColor` (prefer stripe / tint so cards stay readable on dark UI).

## Category pools

Sidebar drop containers:

| Pool            | Purpose                                      |
| --------------- | -------------------------------------------- |
| Junior drivers  | Prospects / never raced F1                   |
| Out of contract | Free agents / not on a team seat in this grid |
| Out next season | Leaving / available for next season fantasy  |

## Drivers (card UI)

Each draggable card shows:

- Full name (`firstname` + `lastname`)
- Age from `birthday`, format: `28y 235d` (`date-fns`)
- Country flag from flagcdn.com using `countryCode`
- Status as **color only** (no status text)

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header: grid badges | restore | save as | import | export   │
├──────────────┬──────────────────────────────────────────────┤
│ Sidebar      │ Main                                         │
│              │                                              │
│ Junior       │  Team containers in fixed order              │
│ Out of       │  (grid, ideally no page scroll)              │
│   contract   │                                              │
│ Out next     │                                              │
│   season     │                                              │
├──────────────┴──────────────────────────────────────────────┤
│ Footer: copyright placeholder · GitHub placeholder          │
└─────────────────────────────────────────────────────────────┘
```

- Desktop only; use all available space
- Teams in the center; three pools in a sidebar
- Prefer no page scrolling; container-level overflow OK if a stack grows large

## Header

### Grid switcher

- Badges/buttons for each grid
- Click → set active grid
- **Default grid**
  - Muted style (shadcn muted)
  - Label not changeable
  - Not deletable
  - Resettable via “Restore defaults”
- **Other grids** (saved / imported)
  - Accent style (shadcn accent/primary treatment)
  - Deletable via **X** on the badge
  - Not resettable
- Deleting the active non-default grid → fall back to default

### Actions

| Action            | Behavior                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| Restore defaults  | Only for the **default** grid; resets its assignments to initial state   |
| Save as new grid  | Prompt for label; clone **current** assignments into a new non-default grid |
| Export            | Dialog with a copyable string of the **active** grid’s assignments only  |
| Import            | Dialog with textarea + **required name/label**; creates a new grid and activates it |

## Import / export

- Format: plain JSON string (no extra libraries)
- Scope: **active grid placements only** (not the whole multi-grid store)
- Suggested payload shape:

```json
{
  "v": 1,
  "assignments": {
    "mclaren": ["norris", "piastri"],
    "junior": ["aron"],
    "outOfContract": ["bottas"],
    "outNextSeason": []
  }
}
```

- Export: show string to copy (label is not required inside the payload)
- Import: user provides label + paste string → validate/parse → new grid
- Save as new: user provides label → copy current assignments → new grid

## Initial state

- Ship a provisional default distribution of all drivers into teams/pools
- Placeholder is fine for the first draft; replace with a real default map later
- “Restore defaults” reloads that initial assignment for the default grid only

## DnD rules

- Freeform stacks: any number of drivers per team or pool
- No seat caps, no forced 2-driver limit, no special swap rules
- Drag freely between any containers (teams ↔ pools ↔ teams)
- Drop appends to the target container list

## Footer

- Copyright placeholder
- GitHub repo link placeholder

## Out of scope (for now)

- Mobile / responsive layout
- Display of contract `since` / `until`
- Seat numbers or official line-up validation
- URL-based sharing (string import/export only)
- Per-import custom badge colors beyond default vs accent

## Implementation checklist (first draft)

1. Reorder teams data to match the fixed order above  
2. Runtime driver ids + container keys + provisional initial assignments  
3. Zustand multi-grid store with `localStorage` persist  
4. App shell: header / sidebar pools / team grid / footer  
5. Driver cards (name, age, flag, status color)  
6. Drag and drop between all containers  
7. Restore defaults (default grid only)  
8. Save as new grid (name prompt)  
9. Export active grid (dialog + copy string)  
10. Import grid (name + paste string → new grid)  
11. Grid badges (switch, delete non-default)
