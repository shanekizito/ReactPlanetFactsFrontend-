import Lottie from "lottie-react";
import planet_line_loading from "../../assets/lottie/planet-line-loading.json";

export const Loading = () => {
  return (
    <section className="fixed inset-0 z-[100] bg-space-black flex flex-col justify-center items-center gap-8">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Lottie
          loop
          autoplay
          animationData={planet_line_loading}
          className="w-full h-full opacity-50"
        />
        <div className="absolute inset-0 border-2 border-nasa-blue border-t-nasa-red rounded-full animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-black tracking-[0.4em] animate-pulse">Initializing Data</h2>
        <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Syncing with Deep Space Network...</p>
      </div>
    </section>
  );
};
