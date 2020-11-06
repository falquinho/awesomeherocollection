import axios, { AxiosAdapter, AxiosResponse } from 'axios';
import { MapsPlace } from '../interfaces/MapsPlace';

const googlePlacesAxios = axios.create({
    url: "https://maps.googleapis.com/maps/api/place/findplacefromtext",
    timeout: 10000,
});

const requiredParams = "&key=AIzaSyD6xV0oxu3bgsKnWuA-6etd-X-8Er2jl5g&inputtype=textquery&fields=name,geometry,formatted_address,place_id";

const googlePlacesApi = {
    comicShopsClose: ({latitude, longitude}: any): Promise<AxiosResponse<{candidates: MapsPlace[]}>> => {
        return googlePlacesAxios.get(`/json?&input=comic+book${requiredParams}&locationbias=circle:1000@${latitude},${longitude}`)
    },
}

export default googlePlacesApi;