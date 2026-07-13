export type Committee = {
  slug: string;
  name: string;
  fullName: string;
  agenda: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  studyGuideUrl: string;
};

export const committees: Committee[] = [
  {
    slug: "unsc",
    name: "UNSC",
    fullName: "United Nations Security Council",
    agenda: "Maintaining Regional Stability in the South China Sea",
    level: "Advanced",
    studyGuideUrl: "/study-guides/unsc.pdf",
  },
  {
    slug: "disec",
    name: "DISEC",
    fullName: "Disarmament and International Security Committee",
    agenda: "Regulating the Militarization of Artificial Intelligence",
    level: "Intermediate",
    studyGuideUrl: "/study-guides/disec.pdf",
  },
  {
    slug: "unhrc",
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    agenda: "Protecting the Rights of Refugees and Stateless Persons",
    level: "Intermediate",
    studyGuideUrl: "/study-guides/unhrc.pdf",
  },
  {
    slug: "who",
    name: "WHO",
    fullName: "World Health Organization",
    agenda: "Ensuring Equitable Access to Vaccines in Future Pandemics",
    level: "Beginner",
    studyGuideUrl: "/study-guides/who.pdf",
  },
  {
    slug: "eco",
    name: "ECOSOC",
    fullName: "Economic and Social Council",
    agenda: "Addressing Youth Unemployment in the Digital Economy",
    level: "Beginner",
    studyGuideUrl: "/study-guides/ecosoc.pdf",
  },
  {
    slug: "crisis",
    name: "Crisis Committee",
    fullName: "Joint Crisis Cabinet",
    agenda: "A Real-Time Simulation of a Regional Geopolitical Crisis",
    level: "Advanced",
    studyGuideUrl: "/study-guides/crisis.pdf",
  },
];
