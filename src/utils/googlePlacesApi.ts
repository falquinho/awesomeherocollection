import axios from 'axios';

const googlePlacesAxios = axios.create({
    url: "https://maps.googleapis.com/maps/api/place/findplacefromtext",
    timeout: 10000,
});

const requiredParams = "&key=&inputtype=textquery";

const googlePlacesApi = {
    comicShopsClose: ({latitude, longitude}: any): Promise<any> => {
        return googlePlacesAxios.get(`/json?&input=comic+book${requiredParams}&locationbias=point:${latitude},${longitude}`)
    },
}

export default googlePlacesApi;