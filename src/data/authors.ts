export interface SocialLink {
  platform: "instagram" | "github" | "linkedin";
  url: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  organization: "KN Algo" | "KN Visus";
  socialLinks: SocialLink[];
}

export const authors: Author[] = [
  // KN Visus
  {
    id: "1",
    firstName: "Joanna",
    lastName: "Biel",
    organization: "KN Visus",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/prvvatkavbiel?igsh=aGhhaThyd2kxZjJz&utm_source=qr",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/joanna-biel-821212306/",
      },
    ],
  },
  {
    id: "2",
    firstName: "Weronika",
    lastName: "Pytlos",
    organization: "KN Visus",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/weronika-pytlos-56485b328",
      },
    ],
  },
  {
    id: "3",
    firstName: "Maria",
    lastName: "Bąkowska",
    organization: "KN Visus",
    socialLinks: [],
  },
  {
    id: "4",
    firstName: "Agata",
    lastName: "Wołowicka",
    organization: "KN Visus",
    socialLinks: [],
  },
  {
    id: "5",
    firstName: "Justyna",
    lastName: "Owczarz",
    organization: "KN Visus",
    socialLinks: [],
  },
  {
    id: "6",
    firstName: "Jagoda 'Ewa' ",
    lastName: "Zabilska",
    organization: "KN Visus",
    socialLinks: [],
  },
  // KN Algo
  {
    id: "7",
    firstName: "Filip",
    lastName: "Mikłusiak",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/senzaglutine" },
    ],
  },
  {
    id: "8",
    firstName: "Krystian",
    lastName: "Bury",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/KBruy" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/krystian-bury-x",
      },
    ],
  },
  {
    id: "9",
    firstName: "Mikołaj",
    lastName: "Bogusz",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/mikolajXbogusz" },
    ],
  },
  {
    id: "10",
    firstName: "Piotr",
    lastName: "Kosior",
    organization: "KN Algo",
    socialLinks: [{ platform: "github", url: "https://github.com/Kosiorny" }],
  },
  {
    id: "11",
    firstName: "Kristina",
    lastName: "Pavlovska",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/pavlovskakristina" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/pavlovskakristina",
      },
    ],
  },
  {
    id: "12",
    firstName: "Adrian",
    lastName: "Goral",
    organization: "KN Algo",
    socialLinks: [{ platform: "github", url: "https://github.com/xEdziu" }],
  },
  {
    id: "13",
    firstName: "Artiom",
    lastName: "Borokhov",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/crazymonkey112" },
    ],
  },
  {
    id: "14",
    firstName: "Hanna",
    lastName: "Gąsior",
    organization: "KN Algo",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/irisless.art/",
      },
    ],
  },
  {
    id: "15",
    firstName: "Jakub",
    lastName: "Kowalewski",
    organization: "KN Algo",
    socialLinks: [{ platform: "github", url: "https://github.com/golab6" }],
  },
  {
    id: "16",
    firstName: "Szymon",
    lastName: "Banasiak",
    organization: "KN Algo",
    socialLinks: [{ platform: "github", url: "https://github.com/FaziSPB" }],
  },
  {
    id: "17",
    firstName: "Aleksandra",
    lastName: "Zimna",
    organization: "KN Algo",
    socialLinks: [{ platform: "github", url: "https://github.com/OlciXs" }],
  },
  {
    id: "18",
    firstName: "Tobiasz",
    lastName: "Rolla",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/tobiaszrolla" },
    ],
  },
  {
    id: "19",
    firstName: "Jakub",
    lastName: "Rolak",
    organization: "KN Algo",
    socialLinks: [
      { platform: "github", url: "https://github.com/serplay" },
      {
        platform: "instagram",
        url: "https://www.instagram.com/causewhynotbruh",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/jakub-rolak/",
      },
    ],
  },
];
