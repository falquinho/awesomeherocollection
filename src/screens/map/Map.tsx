import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class MapScreen extends React.Component<any, any> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView style={styles.map}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute", 
    top: 0, left: 0, right: 0, bottom: 0 
  }
})

export default MapScreen;