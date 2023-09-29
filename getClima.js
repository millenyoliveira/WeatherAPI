import { api } from "./api";

export async function getClima(locate) {
    try {
        const response = await api.get(`current.json?key=ef56eff6f8204e06bb802905232909&q=${locate}&aqi=no`);
        return response;
    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        return null;
    }
}
