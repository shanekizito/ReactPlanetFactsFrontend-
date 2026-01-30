export interface PlanetsResponse {
  id: string;
  name: string;
  englishName: string;
  gravity: number;
  sideralOrbit: number;
  sideralRotation: number;
  avgTemp: number;
  atmosphere?: string[];
  moons?: number;
  description: string;
  exploration?: {
    mission: string;
    description: string;
    year: number;
  }[];
  surfaceDetails?: string;
  geology?: string;
}
