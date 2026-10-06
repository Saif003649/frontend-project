export type ValveCategory = 
  | 'Ball Valves'
  | 'Gate Valves'
  | 'Globe Valves'
  | 'Butterfly Valves'
  | 'Check Valves'
  | 'Knife Gate Valves'
  | 'Plug Valves'
  | 'Control Valves'
  | 'Safety Relief Valves'
  | 'Strainers'
  | 'Flanges & Fittings'
  | 'Actuated Valves';

export type MaterialType = 
  | 'WCB / Cast Carbon Steel'
  | 'CF8 / SS304'
  | 'CF8M / SS316'
  | 'Forged Steel A105'
  | 'Duplex Stainless Steel (2205)'
  | 'Super Duplex (2507)'
  | 'Monel 400'
  | 'Hastelloy C276'
  | 'Cast Iron / Ductile Iron'
  | 'Hard Anodized Aluminum Alloy'
  | 'CF8M / SS316 Body Options';

export type PressureRating = 
  | 'Class 150'
  | 'Class 300'
  | 'Class 600'
  | 'Class 900'
  | 'Class 1500'
  | 'Class 2500'
  | 'PN10 / PN16'
  | 'PN16'
  | 'PN40 / PN64';

export type EndConnection = 
  | 'Flanged RF (Raised Face)'
  | 'Flanged RTJ (Ring Type Joint)'
  | 'Screwed NPT / BSP'
  | 'Socket Weld (SW)'
  | 'Butt Weld (BW)'
  | 'Wafer Type'
  | 'Lug Type';

export interface ProductSpec {
  sizeRange: string;
  pressureRatings: PressureRating[];
  temperatureRange: string;
  materials: MaterialType[];
  endConnections: EndConnection[];
  standards: string[];
  seatMaterial: string;
  operationTypes: string[];
}

export interface Product {
  id: string;
  name: string;
  category: ValveCategory;
  tagline: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  specs: ProductSpec;
  applications: string[];
  brand: string;
  datasheetUrl?: string;
  certifications: string[];
  modelNumber: string;
}

export interface Brand {
  id: string;
  name: string;
  logoText: string;
  description: string;
  origin: string;
  authorizedDealer: boolean;
  categories: ValveCategory[];
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  description: string;
  keyRequirements: string[];
  recommendedProducts: string[];
  bgImage: string;
}

export interface TechnicalDatasheet {
  id: string;
  title: string;
  category: ValveCategory;
  fileSize: string;
  format: string;
  standard: string;
  downloadCount: number;
}

export interface RfqItem {
  productId?: string;
  productName: string;
  category: ValveCategory;
  size: string;
  pressureClass: PressureRating;
  material: MaterialType;
  endConnection: EndConnection;
  operation: string;
  quantity: number;
  fluidMedium: string;
  operatingTemp: string;
  specialNotes?: string;
}

export interface RfqSubmission {
  id: string;
  rfqNumber: string;
  date: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  items: RfqItem[];
  status: 'Pending Review' | 'Technical Valuation' | 'Quoted' | 'Approved' | 'Dispatched';
  totalEstimatedValue?: string;
}

export interface DealerApplication {
  id: string;
  companyName: string;
  taxId: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  annualTurnover: string;
  existingBrands: string[];
  status: 'Under Verification' | 'Approved' | 'Rejected';
  tier: 'Authorized' | 'Gold Tier' | 'Platinum Tier';
}

export interface OrderTrackResult {
  orderNumber: string;
  heatNumber: string;
  productName: string;
  quantity: number;
  customerName: string;
  dispatchDate: string;
  hydroTestResult: 'PASSED (API 598)' | 'PENDING';
  mtrCertNumber: string;
  currentLocation: string;
  status: 'Forging / Casting' | 'Machining & Assembly' | 'Hydrostatic Testing' | 'Quality Control' | 'Ready for Export' | 'In Transit';
}
