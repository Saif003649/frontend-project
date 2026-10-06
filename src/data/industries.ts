import { Industry } from '../types';

export const industriesData: Industry[] = [
  {
    id: 'ind-oil-gas',
    name: 'Oil & Gas Pipeline & Refining',
    iconName: 'Flame',
    description: 'API 6D certified trunnion ball valves, gate valves, and check valves built for upstream extraction, offshore rigs, and downstream refining.',
    keyRequirements: ['API 6D & API 607 Fire Safe', 'NACE MR0175 Sour Gas Resistance', 'Double Block & Bleed (DBB)', 'High Pressure Class 1500/2500'],
    recommendedProducts: ['VE-BV-3PC-150', 'VE-GV-600-WCB', 'VE-FL-WELD-NECK'],
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ind-petro-chem',
    name: 'Petrochemical & Chemical Processing',
    iconName: 'FlaskConical',
    description: 'Corrosion-resistant SS316, Duplex 2205, Hastelloy, and Monel valves for handling sulfuric acid, ethylene, solvents, and corrosive hydrocarbons.',
    keyRequirements: ['Fugitive Emissions ISO 15848-1', 'PTFE / PEEK Chemical Sealing', 'Zero Stem Leakage', 'CE-PED Pressure Equipment Directive'],
    recommendedProducts: ['VE-GL-300-SS', 'VE-PLUG-LUB-300', 'VE-CTRL-GLOBE-MOD'],
    bgImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ind-power-steam',
    name: 'Power Generation & Steam Plants',
    iconName: 'Zap',
    description: 'High-temperature alloy steel gate, globe, and safety valves engineered for high-pressure superheated steam lines and boiler feedwater.',
    keyRequirements: ['ASME Boiler & Pressure Vessel Code Sec. VIII', 'High Temp Stellite Hardfacing', 'Pressure Seal Bonnet', 'Thermal Transient Resistance'],
    recommendedProducts: ['VE-GV-600-WCB', 'VE-SRV-HIGH-PRESS', 'VE-YS-600-MESH'],
    bgImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ind-pharma-food',
    name: 'Pharmaceutical & Food Processing',
    iconName: 'ShieldCheck',
    description: 'Ultra-hygienic polished SS316L sanitary ball valves and diaphragm valves with zero dead-leg zones for WFI steam and FDA compliance.',
    keyRequirements: ['FDA 21 CFR 177 Compliance', '3A Sanitary Standards', 'Ra < 0.4 µm Surface Polish', 'Clean-In-Place (CIP) & Sterilize-In-Place (SIP)'],
    recommendedProducts: ['VE-GL-300-SS', 'VE-CTRL-GLOBE-MOD'],
    bgImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ind-water-hvac',
    name: 'Water Treatment, Desalination & HVAC',
    iconName: 'Droplets',
    description: 'Rubber-lined butterfly valves, sluice gate valves, and dual plate check valves for municipal water supply, desalination, and chilled HVAC loops.',
    keyRequirements: ['WRAS & NSF Drinking Water Certification', 'EPDM / NBR Resilient Sealing', 'Low Head Loss Coefficient', 'Bi-directional Sealing'],
    recommendedProducts: ['VE-BF-HP-TRIPLE', 'VE-CV-DUAL-150', 'VE-ACT-PNEUM-DA'],
    bgImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ind-mining-cement',
    name: 'Mining, Cement & Slurry Handling',
    iconName: 'Pickaxe',
    description: 'Heavy duty knife gate valves and plug valves built to endure severe abrasion from silica sand, ore slurries, tailing lines, and cement powder.',
    keyRequirements: ['MSS SP-81 Knife Gate Standard', 'Hardened 17-4PH Gate Blades', 'Replaceable Urethane / Elastomer Liners', 'Pneumatic Rapid Stroke'],
    recommendedProducts: ['VE-KGV-PNEUM-10', 'VE-PLUG-LUB-300'],
    bgImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
  }
];
