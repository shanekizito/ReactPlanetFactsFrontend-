import { ImageOptions } from "../../types/PlanetImageOptions";
import { PLANET } from "../../types/Planets";

interface Props {
  planet: PLANET;
  type: keyof typeof ImageOptions;
}

export const PlanetImage = ({ planet, type }: Props) => {
  return (
    <div className="relative flex items-center justify-center p-8 md:p-12 scale-110 md:scale-125 lg:scale-150">
      <img
        className="w-48 md:w-56 lg:w-64 transition-all duration-1000 z-10 drop-shadow-[0_0_80px_var(--planet-color)] filter brightness-110 contrast-125"
        src={
          new URL(
            `../../assets/svg/planet-${planet}-${type}.svg`,
            import.meta.url
          ) as unknown as string
        }
        alt={planet}
      />
      {/* Decorative orbital ring / glow */}
      <div className="absolute inset-0 rounded-full border border-holo-cyan border-opacity-10 animate-spin-slow scale-[1.4]" />
      <div className="absolute inset-0 rounded-full border border-white border-opacity-5 animate-spin-slow [animation-duration:90s] scale-[1.8]" />
    </div>
  );
};
