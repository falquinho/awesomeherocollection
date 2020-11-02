import axios from 'axios';
const md5: (arg0: string) => string = require('blueimp-md5');

const publicKey = "558ed6347bbea27b6f865ad4d0cb3cb1";
const privateKey = "3fbfccd9a79d7b1fca56286354476059b6464e48"; // what can I do...

const hash = (ts: number) => md5('' + ts + privateKey  + publicKey);

const reqParams = (): string => {
    const ts = Date.now();
    return `?apikey=${publicKey}&ts=${ts}&hash=${hash(ts)}`;
};

const marvelAxios = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
    timeout: 10000,
})

const marvelApi = {
    characters: (): Promise<any> => marvelAxios.get(`/characters${reqParams()}`),
    characterComics: (characterId: number): Promise<any> => marvelAxios.get(`/character/${characterId}/comics${reqParams()}`),
}

export default marvelApi;