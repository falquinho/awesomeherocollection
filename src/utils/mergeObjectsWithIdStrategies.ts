interface WithId {
    id: number,
}

export type MergeArrayFunction = (oldArray: WithId[], newArray: WithId[]) => WithId[];

const discardOld = (oldArray: WithId[], newArray: WithId[]): WithId[] => newArray;

const concatenate = (oldArray: WithId[], newArray: WithId[]): WithId[] => oldArray.concat(newArray);

const removeDuplicates = (oldArray: WithId[], newArray: WithId[]): WithId[] => {
    const newWithoutDuplicates = newArray.filter(newEl => oldArray.findIndex(oldEl => oldEl.id == newEl.id) == -1);
    return oldArray.concat(newWithoutDuplicates);
}

const MergeObjectsWithIdStrategies = { 
    discardOld, 
    concatenate, 
    removeDuplicates
}

export default MergeObjectsWithIdStrategies;

