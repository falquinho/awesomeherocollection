import axios, { AxiosAdapter, AxiosResponse } from 'axios';
import { MapsPlace } from '../interfaces/MapsPlace';

const googlePlacesAxios = axios.create({
    url: "https://maps.googleapis.com/maps/api/place/findplacefromtext",
    timeout: 10000,
});

const requiredParams = "&key=&inputtype=textquery";

const googlePlacesApi = {
    comicShopsClose: ({latitude, longitude}: any): Promise<AxiosResponse<{candidates: MapsPlace[]}>> => {
        return googlePlacesAxios.get(`/json?&input=comic+book${requiredParams}&locationbias=point:${latitude},${longitude}`)
    },
}

export default googlePlacesApi;