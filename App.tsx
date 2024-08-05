import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";

import styles from "./styles";

const GOOGLE_MAPS_API_KEY = "AIzaSyAXqRpJoapii4U3psCEIZoIezMbv8fGzSI";
const URL = `https://maps.google.com/maps/api/geocode/json?key=${GOOGLE_MAPS_API_KEY}&latlng=`;

export default function App() {
  const [address, setAddress] = useState("Loading...");
  const [longitude, setLongitude] = useState<number | undefined>();
  const [latitude, setLatitude] = useState<number | undefined>();

  useEffect(() => {
    function setPosition({
      coords: { latitude, longitude },
    }: Location.LocationObject) {
      setLatitude(latitude);
      setLongitude(longitude);

      fetch(`${URL}${latitude},${longitude}`)
        .then((response) => response.json())
        .then(({ results }) => {
          if (results.length > 0) {
            setAddress(results[0].formatted_address);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    let watcher: Location.LocationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);

      watcher = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest },
        setPosition
      );
    })();

    return () => {
      watcher.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address: {address}</Text>
      <Text style={styles.label}>Latitude: {latitude}</Text>
      <Text style={styles.label}>Longitude: {longitude}</Text>
    </View>
  );
}
