import { Route, Switch, Redirect } from "wouter";
import { Navbar } from "../../components/Navbar/Navbar";
import { Planet } from "../Planet/Planet";
import { Home } from "../Home/Home";
import { ModuleView } from "../Module/ModuleView";
import { CosmicScene } from "../../components/CosmicScene/CosmicScene";

export const App = () => {
  return (
    <div className="min-h-screen bg-[#000308] text-white selection:bg-nasa-red/30">
      <CosmicScene />
      {/* Global HUD elements */}
      <div className="cosmic-dust" />
      <div className="scanline" />

      <Navbar />

      <main className="relative z-10 pt-24 min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/planet/:planet" component={Planet} />
          <Route path="/module/:id" component={ModuleView} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
