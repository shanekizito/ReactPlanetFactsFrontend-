import { useEffect, useState } from "react";
import { GetPlanetService } from "../services/planets/GetPlanetService";
import { PLANET } from "../types/Planets";
import { PlanetsResponse } from "../types/PlanetsResponse";

interface States {
  loading: boolean;
  data: PlanetsResponse | null;
  error: Error | null;
}

export const useGetPlanet = (planet: PLANET): States => {
  const service = new GetPlanetService();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<States["data"]>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlanet = async () => {
      try {
        setLoading(true);
        setData(null);
        setError(null);
        const res = await service.getPlanetData(planet);
        if (!res) throw new Error(`Planet data for "${planet}" not found`);
        setData(res);
        setLoading(false);
      } catch (err: any) {
        console.error("useGetPlanet error:", err);
        setLoading(false);
        setData(null);
        setError(err);
      }
    };

    getPlanet();
  }, [planet]);

  return {
    loading,
    data,
    error,
  };
};
