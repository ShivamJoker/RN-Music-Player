import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

export default function SliderComp({ mPlayer, isPlaying, songIndex }) {
  const [currentTime, setCurrentTime] = useState(0);

  // console.log(mPlayer);
  const getDuration = () => {
    if (mPlayer.current) {
      return mPlayer.current.duration / 1000;
    } else {
      return 0;
    }
  };

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleChange = (val) => {
    // console.log(event);
    mPlayer.current.seek(val*1000)
    
  };

  useEffect(() => {
    //update the timer every 1 sec
    const updateCurrentTime = () => {
      if (!mPlayer.current) return
      const curTime = Math.round(mPlayer.current.currentTime / 1000) //convert in ms
      setCurrentTime(curTime);
      console.log("current time", (curTime));
    };

    setCurrentTime(0)
    updateCurrentTime();

    let timer;
    if (isPlaying) {
      timer = setInterval(updateCurrentTime, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, songIndex]);


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
