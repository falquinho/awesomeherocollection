/** Double Digits */
const dd = (num: number): string => num < 10? '0'+num : ''+num ;

/**
 * @param date Date to get time string from.
 * @returns Time string in the format 'hh:mm'.
 */
export function customTimeString(date: Date) {  
    const [hour, mins] = [date.getHours(), date.getMinutes()];
    return `${dd(hour)}:${dd(mins)}`;
}