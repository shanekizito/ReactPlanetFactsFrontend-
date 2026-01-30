import { PlanetsResponse } from "../types/PlanetsResponse";

export const planetsData: Record<string, PlanetsResponse> = {
    mercury: {
        id: "mercury",
        name: "Mercury",
        englishName: "Mercury",
        gravity: 3.7,
        sideralOrbit: 87.969,
        sideralRotation: 1407.6,
        avgTemp: 440,
        moons: 0,
        atmosphere: ["Oxygen", "Sodium", "Hydrogen", "Helium", "Potassium"],
        description: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
        exploration: [
            { mission: "Mariner 10", description: "First spacecraft to visit Mercury.", year: 1974 },
            { mission: "MESSENGER", description: "Orbited Mercury for four years, mapping the surface.", year: 2011 }
        ],
        surfaceDetails: "Mercury's surface resembles that of the Moon, scarred by many impact craters resulting from collisions with meteoroids and comets.",
        geology: "Mercury is a rocky planet, also known as a terrestrial planet. It has a solid, cratered surface, much like Earth's moon."
    },
    venus: {
        id: "venus",
        name: "Venus",
        englishName: "Venus",
        gravity: 8.87,
        sideralOrbit: 224.701,
        sideralRotation: -5832.5,
        avgTemp: 737,
        moons: 0,
        atmosphere: ["Carbon Dioxide", "Nitrogen"],
        description: "Venus is our closest planetary neighbor and the second planet from the Sun. It is one of the four inner, terrestrial planets, and it's often called Earth’s twin because it’s similar in size and density.",
        exploration: [
            { mission: "Venera 7", description: "First spacecraft to land on another planet.", year: 1970 },
            { mission: "Magellan", description: "Mapped 98% of the surface using radar.", year: 1990 }
        ],
        surfaceDetails: "The surface of Venus is a very hot and thick atmosphere. It is primarily composed of carbon dioxide, with clouds of sulfuric acid droplets.",
        geology: "Venus has a solid surface covered with mountains, valleys, and thousands of volcanoes."
    },
    earth: {
        id: "earth",
        name: "Earth",
        englishName: "Earth",
        gravity: 9.807,
        sideralOrbit: 365.256,
        sideralRotation: 23.934,
        avgTemp: 288,
        moons: 1,
        atmosphere: ["Nitrogen", "Oxygen", "Argon"],
        description: "Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
        exploration: [
            { mission: "Apollo 11", description: "First humans to walk on the Moon (Earth's subsidiary mission).", year: 1969 },
            { mission: "ISS", description: "Continuous human presence in low Earth orbit.", year: 2000 }
        ],
        surfaceDetails: "Earth's surface is 70% water, with mountains, valleys, and plains. It has a unique atmosphere that protects us from solar radiation.",
        geology: "Earth has a solid crust, a hot mantle, and a core made of iron and nickel."
    },
    mars: {
        id: "mars",
        name: "Mars",
        englishName: "Mars",
        gravity: 3.71,
        sideralOrbit: 686.98,
        sideralRotation: 24.623,
        avgTemp: 210,
        moons: 2,
        atmosphere: ["Carbon Dioxide", "Nitrogen", "Argon"],
        description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
        exploration: [
            { mission: "Viking 1", description: "First successful landing on Mars.", year: 1976 },
            { mission: "Perseverance", description: "Searching for signs of ancient life and collecting samples.", year: 2021 }
        ],
        surfaceDetails: "Mars has a red surface due to iron oxide (rust). It features large volcanoes, deep canyons, and polar ice caps.",
        geology: "Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth."
    },
    jupiter: {
        id: "jupiter",
        name: "Jupiter",
        englishName: "Jupiter",
        gravity: 24.79,
        sideralOrbit: 4332.589,
        sideralRotation: 9.925,
        avgTemp: 165,
        moons: 79,
        atmosphere: ["Hydrogen", "Helium"],
        description: "Jupiter is more than twice as massive as the other planets of our solar system combined. The giant planet's Great Red Spot is a centuries-old storm bigger than Earth.",
        exploration: [
            { mission: "Voyager 1", description: "Discovered Jupiter's rings and several moons.", year: 1979 },
            { mission: "Juno", description: "Studying Jupiter's composition, gravity field, and magnetic field.", year: 2016 }
        ],
        surfaceDetails: "Jupiter is a gas giant and doesn't have a solid surface. Its atmosphere is made of hydrogen and helium gas.",
        geology: "Jupiter's atmosphere is the largest planetary atmosphere in the Solar System. It is composed of 90% hydrogen and 10% helium."
    },
    saturn: {
        id: "saturn",
        name: "Saturn",
        englishName: "Saturn",
        gravity: 10.44,
        sideralOrbit: 10759.22,
        sideralRotation: 10.656,
        avgTemp: 134,
        moons: 82,
        atmosphere: ["Hydrogen", "Helium"],
        description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
        exploration: [
            { mission: "Pioneer 11", description: "First spacecraft to visit Saturn.", year: 1979 },
            { mission: "Cassini-Huygens", description: "Studied Saturn and its rings and moons in great detail.", year: 2004 }
        ],
        surfaceDetails: "Saturn is a gas giant made mostly of hydrogen and helium. It has no solid surface, but it might have a solid core.",
        geology: "Saturn is the second-largest planet in our solar system and is best known for its fabulous rings."
    },
    uranus: {
        id: "uranus",
        name: "Uranus",
        englishName: "Uranus",
        gravity: 8.69,
        sideralOrbit: 30685.4,
        sideralRotation: -17.24,
        avgTemp: 76,
        moons: 27,
        atmosphere: ["Hydrogen", "Helium", "Methane"],
        description: "Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope.",
        exploration: [
            { mission: "Voyager 2", description: "Only spacecraft to visit Uranus.", year: 1986 }
        ],
        surfaceDetails: "Uranus is an ice giant. Most of its mass is a hot, dense fluid of 'icy' materials—water, methane, and ammonia—above a small rocky core.",
        geology: "Uranus is blue-green in color, the result of methane in its mostly hydrogen-helium atmosphere."
    },
    neptune: {
        id: "neptune",
        name: "Neptune",
        englishName: "Neptune",
        gravity: 11.15,
        sideralOrbit: 60189,
        sideralRotation: 16.11,
        avgTemp: 72,
        moons: 14,
        atmosphere: ["Hydrogen", "Helium", "Methane"],
        description: "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant major planet orbiting our Sun.",
        exploration: [
            { mission: "Voyager 2", description: "Only spacecraft to visit Neptune.", year: 1989 }
        ],
        surfaceDetails: "Neptune's atmosphere is made mostly of hydrogen and helium, with some methane. It is the windiest planet in the solar system.",
        geology: "Neptune is an ice giant, and is similar in composition to Uranus."
    },
};
