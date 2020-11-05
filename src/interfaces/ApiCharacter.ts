import { ApiThumbnail } from "./ApiThumbnail";

export interface ApiCharacter {
    id: number,
    name: string,
    thumbnail: ApiThumbnail,
}