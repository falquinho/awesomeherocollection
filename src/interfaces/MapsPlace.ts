export interface MapsPlace {
    formatted_address: string,
    geometry: {location: { lat: number, lng: number }},
    name: string,
    rating: number,
}