import axios from 'axios';

// Use local proxy paths to bypass CORS
const NASA_BASE = '/api/nasa';
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const cache: { [key: string]: { data: any, timestamp: number } } = {};
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

async function fetchWithCache(url: string, params: any) {
    const cacheKey = `${url}?${JSON.stringify(params)}`;
    const now = Date.now();

    if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        console.log(`[Cache Hit] ${url}`);
        return cache[cacheKey].data;
    }

    const response = await axios.get(url, { params });
    cache[cacheKey] = { data: response.data, timestamp: now };
    return response.data;
}

export const nasaService = {
    async getAPOD() {
        return fetchWithCache(`${NASA_BASE}/planetary/apod`, { api_key: API_KEY, hd: true });
    },

    async getEPICNatural() {
        return fetchWithCache(`${NASA_BASE}/EPIC/api/natural`, { api_key: API_KEY });
    },

    async getNEOFeed(startDate: string) {
        return fetchWithCache(`${NASA_BASE}/neo/rest/v1/feed`, {
            start_date: startDate,
            api_key: API_KEY
        });
    },

    async getEONETEvents() {
        return fetchWithCache('https://eonet.gsfc.nasa.gov/api/v3/events', { status: 'open' });
    },

    async getMarsRoverPhotos(sol: number = 1000) {
        return fetchWithCache(`${NASA_BASE}/mars-photos/api/v1/rovers/curiosity/photos`, {
            sol,
            api_key: API_KEY
        });
    },

    async getMarsWeather() {
        return fetchWithCache(`${NASA_BASE}/insight_weather/`, {
            feedtype: 'json',
            ver: '1.0',
            api_key: API_KEY
        });
    },

    async getSolarWeather() {
        return fetchWithCache(`${NASA_BASE}/DONKI/FLR`, { api_key: API_KEY });
    },

    async getExoplanets() {
        return fetchWithCache('https://exoplanetarchive.ipac.caltech.edu/TAP/sync', {
            query: 'select pl_name,pl_rade,pl_orbper,st_teff from ps where pl_rade < 2.0',
            format: 'json'
        });
    },

    async getEarthAssets(lat: number, lon: number) {
        return fetchWithCache(`${NASA_BASE}/planetary/earth/assets`, {
            lat,
            lon,
            dim: 0.1,
            api_key: API_KEY
        });
    },

    async getEarthImagery(lat: number, lon: number, date?: string) {
        return `https://api.nasa.gov/planetary/earth/imagery?lat=${lat}&lon=${lon}&api_key=${API_KEY}`;
    },

    async searchLibrary(query: string) {
        return fetchWithCache('https://images-api.nasa.gov/search', { q: query, media_type: 'image' });
    },

    async getTechTransfer() {
        return fetchWithCache('/api/tech/patent/', { api_key: API_KEY });
    }
};
