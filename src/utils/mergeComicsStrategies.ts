import { ApiComic } from "../interfaces/ApiComic";

export type MergeComicsFunction = (oldComics: ApiComic[], newComics: ApiComic[]) => ApiComic[];

const discardOld = (oldArray: ApiComic[], newArray: ApiComic[]): ApiComic[] => newArray;

const concatenate = (oldArray: ApiComic[], newArray: ApiComic[]): ApiComic[] => oldArray.concat(newArray);

const removeDuplicates = (oldArray: ApiComic[], newArray: ApiComic[]): ApiComic[] => {
    // TODO
    return [];
}

const MergeComicsStrategies = { 
    discardOld, 
    concatenate, 
    removeDuplicates
}

export default MergeComicsStrategies;

