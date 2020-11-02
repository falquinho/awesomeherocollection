import axios from 'axios';

const marvelPublicKey = "558ed6347bbea27b6f865ad4d0cb3cb1"; 

const marvelAxios = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
    timeout: 10000,
    headers: { apiKey: marvelPublicKey },
})

const marvelApi = {
    characters: (): Promise<any> => marvelAxios.get('/characters'),
    characterComics: (characterId: number): Promise<any> => marvelAxios.get(`/character/${characterId}/comics`),
}

export default marvelApi;