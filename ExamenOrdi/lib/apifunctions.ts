//import { Method } from "../../../../AppData/Local/deno/npm/registry.npmjs.org/@apollo/protobufjs/1.2.7/index.d.ts";

export const getCityWeather = async (city: string): Promise<string> => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new Error ("API_KEY not found");

    const url = "https://api.api-ninjas.com/v1/weather?city=" + city;
    const response = await fetch(url,
        {
            method: "GET",
            headers: { "X-Api-Key" : API_KEY},
        });
        if (!response.ok) throw new Error ("Failed to fetch weather data");
        const data = await response.json();
        return `${data.temp}ºC`;
};
export const getCityTime = async (city: string): Promise<string> => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new Error ("API_KEY not found");
    const url = "https://api.api-ninjas.com/v1/worldtime?city=" + city;
    const response = await fetch(url,
        {
            method: "GET",
            headers: { "X-Api-Key" : API_KEY},
        });
        if (!response.ok) throw new Error ("Failed to fetch time data");
        const data = await response.json();
        return data.time.slice(0, 5);
}