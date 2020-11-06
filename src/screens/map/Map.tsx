import React from 'react';
import { SafeAreaView, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { Icon, Text, Button } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import I18n from '../../../I18n';
import AndroidOpenSettings from 'react-native-android-open-settings'
import { MapsPlace } from '../../interfaces/MapsPlace';
import googlePlacesApi from '../../utils/googlePlacesApi';
import Snackbar from 'react-native-snackbar';
import HttpErrorMessages from '../../utils/httpErrorMessages';
import { AxiosError } from 'axios';
import { NavigationProp } from '@react-navigation/native';

/** Required by the MapView to set initial position. Values from the lib example. */
const coordsDelta = {
  latitudeDelta: 0.0922, 
  longitudeDelta: 0.0421,
}

interface GeoCoords {
  latitude: number, 
  longitude: number
}

interface Props {
  navigation: NavigationProp<any>,
}

interface State {
  geoposition: GeoCoords | undefined,
  gpsError: boolean,
  locPermGranted: "granted" | "denied" | "never_ask_again",
  comicStoresNearby: Array<MapsPlace>,
  fetchingComicStores: boolean,
}

class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      geoposition: undefined,
      gpsError: false,
      locPermGranted: "granted",
      comicStoresNearby: [],
      fetchingComicStores: false,
    }
    const { navigation } = props;
    navigation.addListener("focus", () => this.onScreenFocus());
    navigation.addListener("blur", () => this.onScreenBlur());
  }

  async componentDidMount() {
    if(!await this.isLocationPermissionGranted()) {
      await this.requestLocationPermission();
    }
    if(await this.isLocationPermissionGranted())
      this.updateGeolocationState();
  }

  isLocationPermissionGranted(): Promise<boolean> {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  }

  requestLocationPermission(): Promise<any> {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(res => this.setState({ locPermGranted: res }));
  }

  onScreenFocus() {
    console.log("Map Screen Focus");
    // It's possible to leave this screen without having the comic stores. Need to check when coming back.
    const { fetchingComicStores, comicStoresNearby } = this.state;
    if(!fetchingComicStores && comicStoresNearby.length == 0)
      this.showComicShopsUpdateSnackbar(I18n.t("noComicStoreFound"));
  }

  onScreenBlur() {
    console.log("Map Screen Blur");
    // Hide snackbar so it doesn't get in the way of other screens
    Snackbar.dismiss();
  }

  /** Check if permission state changed since user can change it at system settings. */
  componentDidUpdate() {
    const { locPermGranted } = this.state;
    this.isLocationPermissionGranted().then(granted => {
      if(granted && locPermGranted != "granted")
        this.setState({ locPermGranted: "granted" });
    })
  }

  updateGeolocationState() {
    this.setState({ 
      geoposition: undefined, 
      gpsError: false 
    });
    Geolocation.getCurrentPosition(
      res => {
        console.log("Geoposition", res);
        this.setState({ geoposition: res.coords }, () => this.updateComicStores())
      }, 
      err => this.setState({ gpsError: true }), 
      { maximumAge: 30000, enableHighAccuracy: true, timeout: 60000 });
  }

  updateComicStores() {
    this.setState({})
    const { geoposition, fetchingComicStores } = this.state;
    if(!geoposition)
      return this.showComicShopsUpdateSnackbar(`${I18n.t("comicStoresError")}. ${I18n.t("gpsUndefined")}`);

    // Need to control if its fetching to avoid firing unecessary requests
    if(fetchingComicStores)
      return;

    this.setState({ fetchingComicStores: true });
    googlePlacesApi.comicShopsClose(geoposition)
    .then(res => {
      this.setState({ 
        comicStoresNearby: res.data.candidates,
        fetchingComicStores: false,
      })
    })
    .catch((err: AxiosError) => {
      console.log("Error retrieving comic stores: ", JSON.stringify(err));
      this.showComicShopsUpdateSnackbar(`${I18n.t("comicStoresError")}. ${HttpErrorMessages[err.code ?? 0]}`);
      this.setState({ fetchingComicStores: false });
    })
  }

  showComicShopsUpdateSnackbar(text: string) {
    const duration = Snackbar.LENGTH_INDEFINITE;
    const action = { 
      text: I18n.t("retry"), 
      onPress: () => this.updateComicStores() 
    }
    Snackbar.show({ text, duration, action });
  }

  render() {
    const { 
      geoposition, 
      gpsError,
      locPermGranted,
      comicStoresNearby,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        {geoposition != undefined && (
          <Animatable.View style={{ flex: 1 }} animation="zoomIn" duration={300}>
            <MapView style={styles.map} region={{...geoposition, ...coordsDelta}}>
            {comicStoresNearby.map(el => (
              <Marker 
                key={el.place_id} 
                coordinate={{latitude: el.geometry.location.lat, longitude: el.geometry.location.lng}} 
                title={el.name} 
                description={el.formatted_address}
              />
            ))}
            </MapView>
          </Animatable.View>
        )}
        {geoposition == undefined && (
          <Animatable.View style={styles.view} animation="spin" iterationCount="infinite" duration={2000}>
            <Icon name="language" size={32}/>
          </Animatable.View>
        )}
        {gpsError &&  (
          <Animatable.View style={styles.view} animation="fadeIn">
            <Text style={styles.text}>{I18n.t("gpsError")}</Text>
            <Button type="outline" icon={{name: "cached"}} title={I18n.t("retry")} onPress={() => this.updateGeolocationState()}/>
          </Animatable.View>
        )}
        {locPermGranted != "granted" && (
          <Animatable.View style={styles.view} animation="fadeIn">
            <Text style={styles.text}>{I18n.t("locationUnauth")}</Text>
            {locPermGranted == "denied" && (
              <Button type="outline" icon={{name: "lock-open"}} title={I18n.t("authorize")} onPress={() => this.requestLocationPermission()}/>
            )}
            {locPermGranted == "never_ask_again" && (
              <Button type="outline" icon={{name: "lock-open"}} title={I18n.t("authorize")} onPress={() => AndroidOpenSettings.applicationSettings()}/>
            )}
          </Animatable.View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute", 
    top: 0, left: 0, right: 0, bottom: 0 
  },
  view: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginVertical: 16,
  },
})

export default MapScreen;