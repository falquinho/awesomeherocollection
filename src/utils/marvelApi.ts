import axios from 'axios';
import { ApiThumbnail } from '../interfaces/ApiThumbnail';
const md5: (arg0: string) => string = require('blueimp-md5');

const publicKey = "558ed6347bbea27b6f865ad4d0cb3cb1";
const privateKey = "3fbfccd9a79d7b1fca56286354476059b6464e48"; // what can I do...

const hash = (ts: number) => md5('' + ts + privateKey  + publicKey);

const authParams = (): string => {
    const ts = Date.now();
    return `apikey=${publicKey}&ts=${ts}&hash=${hash(ts)}`;
};

const marvelAxios = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
    timeout: 10000,
})

const marvelApi = {
    characters: (offset?: number): Promise<any> => marvelAxios.get(`/characters?${authParams()}${(offset != undefined? `&offset=${offset}` : '')}`),
    searchCharacter: (name: string): Promise<any> => marvelAxios.get(`/characters?${authParams()}&limit=40&nameStartsWith=${name}`),
    characterComics: (characterId: number, offset: number): Promise<any> => marvelAxios.get(`/characters/${characterId}/comics?${authParams()}&offset=${offset}`),
}

export function generateCharacterThumbnailUri(thumbnail: ApiThumbnail): string {
    return `${thumbnail.path}/standard_amazing.${thumbnail.extension}`;
}

export function generateComicThumbnailUri(thumbnail: ApiThumbnail): string {
    return `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;
}

export default marvelApi;