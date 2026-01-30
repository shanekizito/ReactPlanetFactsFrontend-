import { PlanetsResponse } from "../../types/PlanetsResponse";

export const PlanetFacts = ({ facts }: { facts: PlanetsResponse }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="holo-border bg-white bg-opacity-5 p-4 flex justify-between items-center group">
        <div className="space-y-1">
          <h3 className="text-[10px] text-gray-400 group-hover:text-holo-cyan transition-colors">Revolution</h3>
          <p className="text-xl font-black">
            {Math.abs(facts.sideralOrbit) > 366
              ? Number((Math.abs(facts.sideralOrbit) / 365).toFixed(1)) + "Y"
              : Number(Math.abs(facts.sideralOrbit).toFixed(0)) + "D"}
          </p>
        </div>
        <div className="w-24 h-1 bg-white bg-opacity-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-holo-cyan opacity-40 animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
        </div>
      </div>

      <div className="holo-border bg-white bg-opacity-5 p-4 flex justify-between items-center group">
        <div className="space-y-1">
          <h3 className="text-[10px] text-gray-400 group-hover:text-holo-cyan transition-colors">Rotation</h3>
          <p className="text-xl font-black">
            {Math.abs(facts.sideralRotation) > 25
              ? Number((Math.abs(facts.sideralRotation) / 24).toFixed(1)) + "D"
              : Number(Math.abs(facts.sideralRotation).toFixed(0)) + "H"}
          </p>
        </div>
        <div className="w-24 h-1 bg-white bg-opacity-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-holo-cyan opacity-40 animate-[shimmer_2s_infinite]" style={{ width: '40%' }} />
        </div>
      </div>

      <div className="holo-border bg-white bg-opacity-5 p-4 flex justify-between items-center group">
        <div className="space-y-1">
          <h3 className="text-[10px] text-gray-400 group-hover:text-holo-cyan transition-colors">Thermal</h3>
          <p className="text-xl font-black text-nasa-red">
            {Number((facts.avgTemp - 273.15).toFixed(0))}°C
          </p>
        </div>
        <div className="w-24 h-1 bg-white bg-opacity-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-nasa-red opacity-40 animate-[shimmer_2s_infinite]" style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );
};
