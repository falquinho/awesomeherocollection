import React from 'react';
import { SafeAreaView, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { Icon, Text, Button } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import I18n from '../../../I18n';
import AndroidOpenSettings from 'react-native-android-open-settings'

/** Required by the MapView to set initial position. Values from the lib example. */
const coordsDelta = {
  latitudeDelta: 0.0922, 
  longitudeDelta: 0.0421,
}

interface GeoCoords {
  latitude: number, 
  longitude: number
}

interface State {
  geoposition: GeoCoords | undefined,
  gpsError: boolean,
  locPermGranted: "granted" | "denied" | "never_ask_again",
}

class MapScreen extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      geoposition: undefined,
      gpsError: false,
      locPermGranted: "granted",
    }
  }

  async componentDidMount() {
    if(!await this.isLocationPermissionGranted()) {
      await this.requestLocationPermission();
    }
    if(await this.isLocationPermissionGranted())
      this.updateGeolocationState();
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
        this.setState({ geoposition: res.coords })
      }, 
      err => this.setState({ gpsError: true }), 
      { maximumAge: 30000, enableHighAccuracy: true, timeout: 60000 });
  }

  isLocationPermissionGranted(): Promise<boolean> {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  }

  requestLocationPermission(): Promise<any> {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(res => this.setState({ locPermGranted: res }));
  }

  render() {
    const { 
      geoposition, 
      gpsError,
      locPermGranted,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        {geoposition != undefined && (
          <Animatable.View style={{ flex: 1 }} animation="zoomIn" duration={300}>
            <MapView style={styles.map} region={{...geoposition, ...coordsDelta}}/>
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