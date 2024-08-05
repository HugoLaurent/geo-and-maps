import React from "react";
import { View, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";

StatusBar.setBarStyle("dark-content");

export default () => (
  <View style={styles.container}>
    <MapView style={styles.mapView} showsUserLocation followsUserLocation>
      <Marker
        title="Cloud Campus"
        description="Cloud Campus"
        coordinate={{ latitude: 48.8585802, longitude: 2.3730884 }}
      />
    </MapView>
  </View>
);
