export interface ScienceSection {
    id: string;
    title: string;
    content: string;
}

export interface ScienceModule {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    facts: { label: string; value: string }[];
    theories: { title: string; description: string }[];
    history: { event: string; year: string }[];
    sections: ScienceSection[];
    researchers: { name: string; contribution: string }[];
    equipment: { name: string; purpose: string }[];
    status: "Operational" | "Awaiting Telemetry" | "Signal Offline";
    image: string;
}

export const scienceModules: Record<string, ScienceModule> = {
    "planetary-systems": {
        id: "planetary-systems",
        title: "Planetary Systems",
        category: "Section 01 // Discovery",
        status: "Operational",
        image: "/assets/exoplanets.png",
        description: "In-depth telemetry and geological analysis of the eight major planets.",
        longDescription: "A planetary system consists of a set of gravitationally bound non-stellar objects in or out of orbit around a star or star system. Our solar system contains 8 planets, 5 dwarf planets, and millions of smaller bodies.",
        facts: [
            { label: "Planets", value: "8 Major" },
            { label: "Moons", value: "290+ Known" },
            { label: "Age", value: "4.6 Billion Years" }
        ],
        theories: [
            { title: "Nebular Hypothesis", description: "Formation from a giant cloud of molecular gas and dust." },
            { title: "Nice Model", description: "Migration of giant planets shaping the early solar system." }
        ],
        history: [
            { event: "Galileo's Telescope", year: "1610" },
            { event: "Uranus Discovery", year: "1781" },
            { event: "Pluto Reclassification", year: "2006" }
        ],
        researchers: [
            { name: "Nicolaus Copernicus", contribution: "Proposed the heliocentric model." },
            { name: "Johannes Kepler", contribution: "Formulated laws of planetary motion." },
            { name: "Carl Sagan", contribution: "Popularized planetary science." }
        ],
        equipment: [
            { name: "Voyager Probes", purpose: "Grand Tour of the outer planets." },
            { name: "Cassini", purpose: "Exploration of Saturn and its rings." },
            { name: "Juno", purpose: "Studying Jupiter's composition and gravity." }
        ],
        sections: [
            { id: "formation", title: "Solar System Formation", content: "The solar system formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud." },
            { id: "terrestrial", title: "Terrestrial Planets", content: "Mercury, Venus, Earth, and Mars are primarily composed of rock and metal, with solid surfaces and few moons." },
            { id: "gas-giants", title: "Gas Giants", content: "Jupiter and Saturn are massive planets composed mainly of hydrogen and helium, lacking a defined solid surface." },
            { id: "ice-giants", title: "Ice Giants", content: "Uranus and Neptune contain heavier elements like oxygen, carbon, nitrogen, and sulfur, often referred to as 'ices'." }
        ]
    },
    cosmology: {
        id: "cosmology",
        title: "Cosmology",
        category: "Section 01 // Deep Space",
        status: "Operational",
        image: "/assets/cosmology.png",
        description: "The study of the origins, evolution, and eventual fate of the universe.",
        longDescription: "Cosmology explores the universe on the largest scales. It investigates how the universe began—from the Big Bang to the current expansion driven by dark energy.",
        facts: [
            { label: "Universe Age", value: "13.8 Billion Years" },
            { label: "Cosmic Background", value: "2.725 Kelvin" },
            { label: "Composition", value: "68% Dark Energy, 27% Dark Matter, 5% Normal Matter" }
        ],
        theories: [
            { title: "Big Bang Theory", description: "The early development of the universe from a point of infinite density." },
            { title: "Cosmic Inflation", description: "Exponential expansion of space in the early universe." }
        ],
        history: [
            { event: "Discovery of CMB", year: "1964" },
            { event: "Hubble Telescope Launch", year: "1990" },
            { event: "Planck Mission Mapping", year: "2013" }
        ],
        researchers: [
            { name: "Edwin Hubble", contribution: "Proved that the universe is expanding." },
            { name: "George Gamow", contribution: "Predicted the Cosmic Microwave Background." },
            { name: "Vera Rubin", contribution: "Provided evidence for Dark Matter." }
        ],
        equipment: [
            { name: "Hubble Space Telescope", purpose: "Deep field imaging and expansion measurement." },
            { name: "Planck Satellite", purpose: "High-resolution mapping of the CMB." },
            { name: "James Webb Telescope", purpose: "Observing the first stars and galaxies." }
        ],
        sections: [
            { id: "origins", title: "Origins of the Universe", content: "The Big Bang theory is the prevailing cosmological model for the observable universe. It describes how the universe expanded from a very high-density and high-temperature state." },
            { id: "dark-energy", title: "Dark Energy & Expansion", content: "Dark energy is an unknown form of energy hypothesized to permeate all of space, accelerating the expansion of the universe." },
            { id: "large-scale-structure", title: "Large-Scale Structure", content: "Characterization of observable distributions of matter and light on the largest scales (billions of light-years)." }
        ]
    },
    physics: {
        id: "physics",
        title: "Quantum Physics",
        category: "Section 02 // Particle Mechanics",
        status: "Operational",
        image: "/assets/quantumphysics.png",
        description: "The study of nature at the smallest scales: atomic and subatomic levels.",
        longDescription: "Quantum mechanics reveals a world where particles don't have definite positions until measured. It is the foundation of all modern technology.",
        facts: [
            { label: "Planck Constant", value: "6.626 x 10^-34 J·s" },
            { label: "Speed of Light", value: "299,792,458 m/s" },
            { label: "Standard Model", value: "17 Fundamental Particles" }
        ],
        theories: [
            { title: "Wave-Particle Duality", description: "Entities described as both particles and waves." },
            { title: "Entanglement", description: "Particles linked across vast distances." }
        ],
        history: [
            { event: "Photoelectric Effect", year: "1905" },
            { event: "Schrödinger Equation", year: "1925" },
            { event: "Quantum Computing Demo", year: "1998" }
        ],
        researchers: [
            { name: "Max Planck", contribution: "Discovery of energy quanta." },
            { name: "Werner Heisenberg", contribution: "Formulated the Uncertainty Principle." },
            { name: "Richard Feynman", contribution: "Pioneer of Quantum Electrodynamics." }
        ],
        equipment: [
            { name: "Large Hadron Collider", purpose: "Testing the Standard Model and Higgs Boson." },
            { name: "Scanning Tunneling Microscope", purpose: "Imaging individual atoms." },
            { name: "Quantum Computers", purpose: "Utilizing superposition for computation." }
        ],
        sections: [
            { id: "fundamentals", title: "Fundamental Principles", content: "Energy and momentum are restricted to discrete values (quantization), and objects exhibit both particle and wave characteristics." }
        ]
    },
    astrobiology: {
        id: "astrobiology",
        title: "Astrobiology",
        category: "Section 03 // Biological Frontiers",
        status: "Operational",
        image: "/assets/astrobiology.png",
        description: "The study of life in the universe and the conditions for it to emerge.",
        longDescription: "Astrobiology combines biology and astronomy to search for signs of life on other worlds, from Mars to icy moons like Europa.",
        facts: [
            { label: "Drake Equation", value: "N = R* · fp · ne · fl · fi · fc · L" },
            { label: "Habitable Planets", value: "Estimated 40 Billion" },
            { label: "Extremophiles", value: "Active at 122°C to -20°C" }
        ],
        theories: [
            { title: "Panspermia", description: "Life distributed by space dust and rocks." },
            { title: "RNA World", description: "Self-replicating RNA as precursors to life." }
        ],
        history: [
            { event: "Miller-Urey Experiment", year: "1952" },
            { event: "Viking Mars Landings", year: "1976" },
            { event: "JWST First Light", year: "2022" }
        ],
        researchers: [
            { name: "Carl Sagan", contribution: "Pioneer in exobiology and SETI." },
            { name: "Jill Tarter", contribution: "Leader in the search for extraterrestrial intelligence." },
            { name: "Lynn Margulis", contribution: "Theories on symbiosis and life's evolution." }
        ],
        equipment: [
            { name: "Mars Rovers (Perseverance)", purpose: "Searching for signs of ancient life." },
            { name: "Europa Clipper", purpose: "Assessing the habitability of Europa's ocean." },
            { name: "ALMA Telescope", purpose: "Observing molecular clouds and protoplanetary disks." }
        ],
        sections: [
            { id: "habitable-zones", title: "Habitable Zones", content: "The range of orbits around a star within which a planetary surface can support liquid water." }
        ]
    },
    galaxies: {
        id: "galaxies",
        title: "Galactic Systems",
        category: "Section 04 // Macro Systems",
        status: "Operational",
        image: "/assets/galacticsystems.png",
        description: "Investigating the formation and dynamics of massive star systems.",
        longDescription: "Galaxies are gravitationally bound systems of stars, remnants, gas, dust, and dark matter, categorized by their visual morphology.",
        facts: [
            { label: "Milky Way Size", value: "100,000 Light Years" },
            { label: "Star Count", value: "400 Billion Stars" },
            { label: "Black Hole Center", value: "Sagittarius A*" }
        ],
        theories: [
            { title: "Cannibalism", description: "Large galaxies merging with smaller ones." },
            { title: "Density Wave", description: "Explaining spiral arm structure." }
        ],
        history: [
            { event: "Messier Catalog", year: "1771" },
            { event: "Shapley-Curtis Debate", year: "1920" },
            { event: "Hubble Ultra Deep Field", year: "2004" }
        ],
        researchers: [
            { name: "Charles Messier", contribution: "Cataloged 110 deep-sky objects." },
            { name: "Henrietta Leavitt", contribution: "Discovered Cepheid variable relationship." },
            { name: "Fritz Zwicky", contribution: "Pioneer in dark matter and galaxy clusters." }
        ],
        equipment: [
            { name: "Sloan Digital Sky Survey", purpose: "Detailed mapping of the universe's structure." },
            { name: "Very Large Array (VLA)", purpose: "Radio observations of active galaxies." },
            { name: "Chandra X-ray Observatory", purpose: "Imaging high-energy regions and black holes." }
        ],
        sections: [
            { id: "morphology", title: "Galaxy Morphology", content: "The classification of galaxies based on their visual appearance, such as spiral, elliptical, or irregular." }
        ]
    },
    blackholes: {
        id: "blackholes",
        title: "Black Holes",
        category: "Section 05 // Gravitational Anomalies",
        status: "Operational",
        image: "/assets/blackholes.png",
        description: "Regions of spacetime where gravity is so strong that nothing, including light, can escape.",
        longDescription: "Black holes are formed from the remnants of massive stars. Their existence was predicted by general relativity and has since been proven through the observation of their effects on surrounding matter.",
        facts: [
            { label: "Schwarzschild Radius", value: "Rs = 2GM/c^2" },
            { label: "Entropy", value: "Proportional to Surface Area" },
            { label: "Gravity Level", value: "Infinite at Singularity" }
        ],
        theories: [
            { title: "Hawking Radiation", description: "The predicted thermal radiation from black holes due to quantum effects." },
            { title: "No-Hair Theorem", description: "Black holes are characterized by only mass, charge, and angular momentum." }
        ],
        history: [
            { event: "Schwarzschild Prediction", year: "1916" },
            { event: "Cygnus X-1 Identification", year: "1971" },
            { event: "Event Horizon Image", year: "2019" }
        ],
        researchers: [
            { name: "Stephen Hawking", contribution: "Discovery of Hawking Radiation." },
            { name: "Karl Schwarzschild", contribution: "First exact solution to Einstein's equations." },
            { name: "Andrea Ghez", contribution: "Discovered the supermassive black hole at our galaxy center." }
        ],
        equipment: [
            { name: "Event Horizon Telescope", purpose: "Imaging black hole shadows." },
            { name: "LIGO", purpose: "Detecting gravitational waves from mergers." },
            { name: "XMM-Newton", purpose: "Observing X-ray emissions from accretion disks." }
        ],
        sections: [
            { id: "event-horizon", title: "The Event Horizon", content: "The boundary around a black hole beyond which no escape is possible." },
            { id: "singularity", title: "Spacetime Singularity", content: "The point of infinite density at the center of a black hole." }
        ]
    },
    exoplanets: {
        id: "exoplanets",
        title: "Exoplanets",
        category: "Section 06 // Stellar Neighbors",
        status: "Operational",
        image: "/assets/exoplanets.png",
        description: "Planets that orbit stars outside our solar system.",
        longDescription: "The discovery of exoplanets has revolutionized our understanding of the universe, revealing a diversity of worlds far beyond what we imagined in our own solar system.",
        facts: [
            { label: "Confirmed Count", value: "Over 5,500" },
            { label: "Nearest Planet", value: "Proxima Centauri b (4.2 LY)" },
            { label: "Most common type", value: "Sub-Neptunes and Super-Earths" }
        ],
        theories: [
            { title: "Planetary Migration", description: "Gaseous giants moving inward from their birthplaces." },
            { title: "Core Accretion", description: "The standard model of giant planet formation." }
        ],
        history: [
            { event: "First Confirmation", year: "1992" },
            { event: "Kepler Mission Launch", year: "2009" },
            { event: "TRAPPIST-1 Discovery", year: "2017" }
        ],
        researchers: [
            { name: "Sara Seager", contribution: "Pioneer in exoplanet atmospheres." },
            { name: "Michel Mayor", contribution: "Co-discovered the first exoplanet around a sun-like star." },
            { name: "Natalie Batalha", contribution: "Lead scientist for the Kepler mission." }
        ],
        equipment: [
            { name: "Kepler Space Telescope", purpose: "Transiting planet survey." },
            { name: "TESS", purpose: "Surveying the brightest stars for exoplanets." },
            { name: "CHEOPS", purpose: "Characterizing known exoplanets." }
        ],
        sections: [
            { id: "transits", title: "Transit Photometry", content: "Detecting planets by the slight dip in a star's brightness as the planet passes in front of it." },
            { id: "direct-imaging", title: "Direct Imaging", content: "Capturing the light from the planet itself, separate from its host star." }
        ]
    },
    darkmatter: {
        id: "darkmatter",
        title: "Dark Systems",
        category: "Section 07 // Invisible Universe",
        status: "Operational",
        image: "/assets/darkmatter.png",
        description: "The mysterious substances that make up 95% of the universe's energy density.",
        longDescription: "Dark matter provides the gravitational glue for galaxies, while dark energy drives the accelerated expansion of space. Together, they challenge every fundamental theory of physics.",
        facts: [
            { label: "Dark Energy", value: "68.3%" },
            { label: "Dark Matter", value: "26.8%" },
            { label: "Visible Matter", value: "4.9%" }
        ],
        theories: [
            { title: "WIMPs", description: "Weakly Interacting Massive Particles as dark matter candidates." },
            { title: "Lambda-CDM", description: "The standard model of big bang cosmology." }
        ],
        history: [
            { event: "Galaxy Rotation Curves", year: "1970" },
            { event: "Discovery of Acceleration", year: "1998" },
            { event: "Bullet Cluster Evidence", year: "2006" }
        ],
        researchers: [
            { name: "Vera Rubin", contribution: "Provided primary evidence for dark matter." },
            { name: "Saul Perlmutter", contribution: "Co-discovered the expansion acceleration." },
            { name: "Albert Einstein", contribution: "Cosmological constant as a precursor." }
        ],
        equipment: [
            { name: "Large Synoptic Survey Telescope", purpose: "Mapping the dark universe." },
            { name: "XENONnT", purpose: "Direct detection of dark matter particles." },
            { name: "Euclid Mission", purpose: "Probing dark energy via weak lensing." }
        ],
        sections: [
            { id: "gravity", title: "Gravitational Influence", content: "Dark matter's presence is inferred from gravitational effects on visible matter and background radiation." },
            { id: "expansion", title: "Accelerating Expansion", content: "Dark energy acts as a repulsive force, causing galaxies to fly apart at ever-increasing speeds." }
        ]
    },
    stringtheory: {
        id: "stringtheory",
        title: "String Theory",
        category: "Section 08 // Multi-Dimensions",
        status: "Operational",
        image: "/assets/stringtheory.png",
        description: "The theoretical framework where particles are replaced by one-dimensional strings.",
        longDescription: "String theory aims to be the 'Theory of Everything,' unifying general relativity and quantum mechanics by postulating that the universe has up to 11 dimensions.",
        facts: [
            { label: "Dimensions", value: "10 or 11" },
            { label: "String Length", value: "Planck Scale (10^-35m)" },
            { label: "Vibration Type", value: "Determines Particle Identity" }
        ],
        theories: [
            { title: "M-Theory", description: "The unification of five different string theories." },
            { title: "Supersymmetry", description: "The symmetry between bosons and fermions." }
        ],
        history: [
            { event: "Veneziano Model", year: "1968" },
            { event: "First Superstring Revolution", year: "1984" },
            { event: "M-Theory Proposal", year: "1995" }
        ],
        researchers: [
            { name: "Edward Witten", contribution: "Primary developer of M-theory." },
            { name: "Brian Greene", contribution: "Famous for popularizing string theory." },
            { name: "Leonard Susskind", contribution: "Co-founder of string theory." }
        ],
        equipment: [
            { name: "Mathematical Models", purpose: "Primary tool for high-dimension analysis." },
            { name: "Supercomputers", purpose: "Calculating Calabi-Yau manifold configurations." }
        ],
        sections: [
            { id: "dimensions", title: "Higher Dimensions", content: "Strings vibrate in hidden, compactified dimensions that define the physical laws we observe." }
        ]
    },
    stellar: {
        id: "stellar",
        title: "Stellar Evolution",
        category: "Section 09 // Nuclear Engines",
        status: "Operational",
        image: "/assets/stellarevolution.png",
        description: "The life cycles of stars, from nebular birth to supernova collapse.",
        longDescription: "Stars are the foundries of the universe, forging all elements heavier than lithium through nuclear fusion before ending as dwarfs, neutron stars, or black holes.",
        facts: [
            { label: "Core Temp", value: "15 Million Kelvin (Sun)" },
            { label: "Lifespan", value: "10 Billion Years (Sun)" },
            { label: "Final Stage", value: "Supernova or White Dwarf" }
        ],
        theories: [
            { title: "Chandrasekhar Limit", description: "The maximum mass of a stable white dwarf star." },
            { title: "Nucleosynthesis", description: "The process of creating new atomic nuclei." }
        ],
        history: [
            { event: "H-R Diagram", year: "1911" },
            { event: "Nuclear Fusion Hypothesis", year: "1920" },
            { event: "Supernova Type Ia Standard", year: "1990" }
        ],
        researchers: [
            { name: "Subrahmanyan Chandrasekhar", contribution: "Mass limits for stellar remnants." },
            { name: "Cecilia Payne-Gaposchkin", contribution: "Discovered stars are mostly hydrogen." },
            { name: "Arthur Eddington", contribution: "Early theories of stellar structure." }
        ],
        equipment: [
            { name: "Spectrometers", purpose: "Analyzing chemical composition of starlight." },
            { name: "Solar Dynamics Observatory", purpose: "High-resolution sun monitoring." },
            { name: "NuSTAR", purpose: "Observing high-energy stellar remnants." }
        ],
        sections: [
            { id: "lifecycle", title: "Main Sequence", content: "The longest stage of a star's life where it burns hydrogen into helium in its core." }
        ]
    }
};
