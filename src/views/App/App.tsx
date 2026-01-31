import { Route, Switch, Redirect } from "wouter";
import { Navbar } from "../../components/Navbar/Navbar";
import { CosmicScene } from "../../components/CosmicScene/CosmicScene";
import { Preloader } from "../../components/Preloader/Preloader";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("../Home/Home").then(module => ({ default: module.Home })));
const Planet = lazy(() => import("../Planet/Planet").then(module => ({ default: module.Planet })));
const ModuleView = lazy(() => import("../Module/ModuleView").then(module => ({ default: module.ModuleView })));

export const App = () => {
  return (
    <Preloader>
      <div className="min-h-screen bg-[#000308] text-white selection:bg-nasa-red/30">
        <CosmicScene />
        {/* Global HUD elements */}
        <div className="cosmic-dust" />
        <div className="scanline" />

        <Navbar />

        <main className="relative z-10 pt-24 min-h-screen">
          <Suspense fallback={null}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/planet/:planet" component={Planet} />
              <Route path="/module/:id" component={ModuleView} />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </Preloader>
  );
};
