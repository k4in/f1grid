import type { Drivers } from "@/types/types";

export const drivers: Drivers = [
  // --- Current / contracted grid drivers ---
  {
    firstname: "Lando",
    lastname: "Norris",
    birthday: "1999-11-13",
    countryCode: "GB",
    status: {
      state: "current",
      until: "2027-12-31",
      since: "2019-03-17",
    },
  },
  {
    firstname: "Oscar",
    lastname: "Piastri",
    birthday: "2001-04-06",
    countryCode: "AU",
    status: {
      state: "contract",
      until: "2028-12-31",
      since: "2023-03-05",
    },
  },
  {
    firstname: "George",
    lastname: "Russell",
    birthday: "1998-02-15",
    countryCode: "GB",
    status: {
      state: "current",
      until: null,
      since: "2022-03-20",
    },
  },
  {
    firstname: "Kimi",
    lastname: "Antonelli",
    birthday: "2006-08-25",
    countryCode: "IT",
    status: {
      state: "current",
      until: "2027-12-31",
      since: "2025-03-16",
    },
  },
  {
    firstname: "Max",
    lastname: "Verstappen",
    birthday: "1997-09-30",
    countryCode: "NL",
    status: {
      state: "contract",
      until: "2028-12-31",
      since: "2016-05-15",
    },
  },
  {
    firstname: "Isack",
    lastname: "Hadjar",
    birthday: "2004-09-28",
    countryCode: "FR",
    status: {
      state: "current",
      until: null,
      since: "2025-03-16",
    },
  },
  {
    firstname: "Lewis",
    lastname: "Hamilton",
    birthday: "1985-01-07",
    countryCode: "GB",
    status: {
      state: "current",
      until: null,
      since: "2025-03-16",
    },
  },
  {
    firstname: "Charles",
    lastname: "Leclerc",
    birthday: "1997-10-16",
    countryCode: "MC",
    status: {
      state: "contract",
      until: "2029-12-31",
      since: "2019-03-17",
    },
  },
  {
    firstname: "Carlos",
    lastname: "Sainz",
    birthday: "1994-09-01",
    countryCode: "ES",
    status: {
      state: "current",
      until: "2027-12-31",
      since: "2025-03-16",
    },
  },
  {
    firstname: "Alexander",
    lastname: "Albon",
    birthday: "1996-03-23",
    countryCode: "TH",
    status: {
      state: "current",
      until: null,
      since: "2022-03-20",
    },
  },
  {
    firstname: "Liam",
    lastname: "Lawson",
    birthday: "2002-02-11",
    countryCode: "NZ",
    status: {
      state: "current",
      until: null,
      since: "2025-03-16",
    },
  },
  {
    firstname: "Arvid",
    lastname: "Lindblad",
    birthday: "2007-08-08",
    countryCode: "GB",
    status: {
      state: "current",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Lance",
    lastname: "Stroll",
    birthday: "1998-10-29",
    countryCode: "CA",
    status: {
      state: "contract",
      until: "2028-12-31",
      since: "2017-03-26",
    },
  },
  {
    firstname: "Fernando",
    lastname: "Alonso",
    birthday: "1981-07-29",
    countryCode: "ES",
    status: {
      state: "current",
      until: null,
      since: "2023-03-05",
    },
  },
  {
    firstname: "Esteban",
    lastname: "Ocon",
    birthday: "1996-09-17",
    countryCode: "FR",
    status: {
      state: "current",
      until: null,
      since: "2025-03-16",
    },
  },
  {
    firstname: "Oliver",
    lastname: "Bearman",
    birthday: "2005-05-08",
    countryCode: "GB",
    status: {
      state: "current",
      until: "2027-12-31",
      since: "2025-03-16",
    },
  },
  {
    firstname: "Nico",
    lastname: "Hülkenberg",
    birthday: "1987-08-19",
    countryCode: "DE",
    status: {
      state: "current",
      until: null,
      since: "2025-03-16",
    },
  },
  {
    firstname: "Gabriel",
    lastname: "Bortoleto",
    birthday: "2004-10-14",
    countryCode: "BR",
    status: {
      state: "current",
      until: "2027-12-31",
      since: "2025-03-16",
    },
  },
  {
    firstname: "Pierre",
    lastname: "Gasly",
    birthday: "1996-02-07",
    countryCode: "FR",
    status: {
      state: "contract",
      until: null, // 2028
      since: "2023-03-05",
    },
  },
  {
    firstname: "Franco",
    lastname: "Colapinto",
    birthday: "2003-05-27",
    countryCode: "AR",
    status: {
      state: "current",
      until: null,
      since: "2025-03-16",
    },
  },
  {
    firstname: "Valtteri",
    lastname: "Bottas",
    birthday: "1989-08-28",
    countryCode: "FI",
    status: {
      state: "current",
      until: null, //2027
      since: null, //2026
    },
  },
  {
    firstname: "Sergio",
    lastname: "Pérez",
    birthday: "1990-01-26",
    countryCode: "MX",
    status: {
      state: "current",
      until: null, //2027
      since: null, //2026
    },
  },

  // --- Additional drivers ---
  {
    firstname: "Yuki",
    lastname: "Tsunoda",
    birthday: "2000-05-11",
    countryCode: "JP",
    status: {
      state: "previous",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Paul",
    lastname: "Aron",
    birthday: "2004-02-04",
    countryCode: "EE",
    status: {
      state: "junior",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Nikola",
    lastname: "Tsolov",
    birthday: "2006-12-21",
    countryCode: "BG",
    status: {
      state: "junior",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Rafael",
    lastname: "Câmara",
    birthday: "2005-05-05",
    countryCode: "BR",
    status: {
      state: "junior",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Colton",
    lastname: "Herta",
    birthday: "2000-03-30",
    countryCode: "US",
    status: {
      state: "junior",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Leonardo",
    lastname: "Fornaroli",
    birthday: "2004-12-13",
    countryCode: "IT",
    status: {
      state: "junior",
      until: null,
      since: null,
    },
  },
  {
    firstname: "Alex",
    lastname: "Dunne",
    birthday: "2005-11-11",
    countryCode: "IE",
    status: {
      state: "junior",
      until: null,
      since: null,
    },
  },
];
