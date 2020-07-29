import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';


export default function SliderComp({ mPlayer, isPlaying, songIndex }) {
  const [currentTime, setCurrentTime] = useState(0);

  

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleChange = (val) => {
    // console.log(event);
    
  };

  useEffect(() => {


  //components 
  return (
    <View style={styles.container}>
      <Slider
        style={{ width: 320, height: 40 }}
        minimumValue={0}
        value={currentTime}
        maximumValue={getDuration()}
        minimumTrackTintColor="#ffffff"
        onSlidingComplete={handleChange}
        maximumTrackTintColor="rgba(255, 255, 255, .5)"
        thumbTintColor="#fff"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timers}>{formatTime(currentTime)}</Text>
        <Text style={styles.timers}>{formatTime(getDuration())}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timers: {
    color: "#fff",
    fontSize: 18,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
