import { AxiosService } from "../AxiosService";
import { PLANET } from "../../types/Planets";
import { PlanetsResponse } from "../../types/PlanetsResponse";
import { AxiosResponse } from "axios";
import { planetsData } from "../../data/planetsData";

export class GetPlanetService extends AxiosService {
  async getPlanetData(planet: PLANET): Promise<PlanetsResponse> {
    // Fallback to local data because the external API now requires an API key (returning 401)
    // Now serving enriched NASA-style data
    return Promise.resolve(planetsData[planet]);
  }
}
