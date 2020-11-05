import { ApiThumbnail } from "./ApiThumbnail";

export interface ApiComic {
    id: number,
    title: string,
    issueNumber: number,
    prices: Array<{type: string, price: number}>,
    thumbnail: ApiThumbnail,
    dates: Array<{type: string, date: any}>,
}