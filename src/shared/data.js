import * as THREE from 'three'

export const MEXICO_BRANCHES = [
  {
    label: "Executive",
    position: [-3, 1, 0],
    color: new THREE.Color(0xffd700),
    info: "Mexico's President of Mexico can only serve 1 6-yr term. They're the head of state + head of government. The current president is Claudia Sheinbaum."
  },
  {
    label: "Legislative",
    position: [0, 2, 0],
    color: new THREE.Color(0xffa500),
    info: "Bicameral Congress: Chamber of Deputies (500 members) and Senate (128 members). Responsible for making federal laws."
  },
  {
    label: "Judicial",
    position: [3, 1, 0],
    color: new THREE.Color(0xff6347),
    info: "Supreme Court of Justice (11 ministers) is the highest court. Includes electoral tribunals to oversee elections."
  }
]

export const IRAN_LAYERS = [
  {
    label: "Supreme Leader",
    position: [0, 5, 0],
    size: [3, 0.5, 3],
    color: new THREE.Color(0x8B0000),
    info: "Highest political & religious authority. Controls military, judiciary, and media. Appointed for life by Assembly of Experts."
  },
  {
    label: "Guardian Council & Assembly of Experts",
    position: [0, 3.8, 0],
    size: [4, 0.5, 4],
    color: new THREE.Color(0xB22222),
    info: "Guardian Council: Vets all legislation and election candidates. Assembly of Experts: Elects and oversees Supreme Leader."
  },
  {
    label: "President & Parliament (Majlis)",
    position: [0, 2.6, 0],
    size: [5, 0.5, 5],
    color: new THREE.Color(0xCD5C5C),
    info: "President: Head of government, elected every 4 years. Parliament: 290-member legislative body with limited power under theocratic oversight."
  },
  {
    label: "Judiciary",
    position: [0, 1.4, 0],
    size: [6, 0.5, 6],
    color: new THREE.Color(0xDC143C),
    info: "Implements Sharia law. Head appointed by Supreme Leader. Includes Revolutionary Courts for political cases and special clerical courts."
  },
  {
    label: "IRGC & Military",
    position: [0, 0.2, 0],
    size: [7, 0.5, 7],
    color: new THREE.Color(0xFF6347),
    info: "Islamic Revolutionary Guard Corps (IRGC): Powerful military force with economic interests. Reports directly to Supreme Leader. Regular military has limited political role."
  },
  {
    label: "State Media & Basij",
    position: [0, -1, 0],
    size: [8, 0.5, 8],
    color: new THREE.Color(0xFF7F50),
    info: "State-controlled media enforces ideological conformity. Basij: Volunteer militia that enforces moral codes and suppresses dissent."
  }
]